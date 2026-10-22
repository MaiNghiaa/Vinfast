// Upload catalog ảnh xe vào Directus. Mặc định chỉ in kế hoạch.
// node scripts/import-vehicle-media.mjs
// node scripts/import-vehicle-media.mjs --apply
import fs from "fs";
import path from "path";
import { DIRECTUS_URL, directusJson, ensureFolder, getAuthToken } from "./directus-client.mjs";

const apply = process.argv.includes("--apply");
const catalogPath = path.resolve("directus/catalog/vehicles.media.json");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const mapPath = path.resolve("directus/catalog/.upload-map.json");
const fileIds = fs.existsSync(mapPath) ? JSON.parse(fs.readFileSync(mapPath, "utf8")) : {};

function localPath(url) {
  if (!url || !url.startsWith("/images/")) return null;
  const filePath = path.resolve("public", url.replace(/^\//, ""));
  return fs.existsSync(filePath) ? filePath : null;
}

function contentType(filePath) {
  return path.extname(filePath).toLowerCase() === ".png" ? "image/png" : "image/jpeg";
}

async function uploadLocal(url, folderId) {
  if (fileIds[url]) return fileIds[url];
  const filePath = localPath(url);
  if (!filePath) return null;
  const buffer = fs.readFileSync(filePath);
  const form = new FormData();
  form.append("file", new Blob([buffer], { type: contentType(filePath) }), path.basename(filePath));
  if (folderId) form.append("folder", folderId);
  form.append("title", path.basename(filePath));
  const token = await getAuthToken();
  const res = await fetch(`${DIRECTUS_URL}/files`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) {
    console.warn(`upload fail ${url}: ${res.status} ${await res.text()}`);
    return null;
  }
  const data = await res.json();
  fileIds[url] = data.data.id;
  fs.writeFileSync(mapPath, JSON.stringify(fileIds, null, 2));
  return data.data.id;
}

async function main() {
  const localCount = catalog.vehicles.reduce((n, v) => n + v.local_assets.length, 0);
  console.log(`${catalog.vehicles.length} xe, ${localCount} ảnh local, mode=${apply ? "apply" : "dry-run"}`);
  for (const vehicle of catalog.vehicles) {
    console.log(`- ${vehicle.slug}: thumb=${vehicle.files.thumbnail} gallery=${vehicle.gallery.length} colors=${vehicle.colors.length}`);
  }
  if (!apply) {
    console.log("Chưa ghi Directus. Chạy lại với --apply khi CMS đang chạy.");
    return;
  }

  const folderId = await ensureFolder("vehicles");
  for (const vehicle of catalog.vehicles) {
    const thumbnail = await uploadLocal(vehicle.files.thumbnail, folderId);
    const banner = await uploadLocal(vehicle.files.banner_image, folderId);
    for (const url of vehicle.gallery) await uploadLocal(url, folderId);
    for (const color of vehicle.colors) await uploadLocal(color.image, folderId);
    for (const section of vehicle.sections) await uploadLocal(section.image, folderId);

    const found = await directusJson(
      `/items/vehicles?filter[slug][_eq]=${encodeURIComponent(vehicle.slug)}&fields=id,additional_attributes&limit=1`
    );
    const payload = {
      thumbnail,
      banner_image: banner,
      additional_attributes: {
        ...(found.data?.[0]?.additional_attributes && typeof found.data[0].additional_attributes === "object"
          ? found.data[0].additional_attributes
          : {}),
        gallery: vehicle.gallery,
      },
    };

    let vehicleId = found.data?.[0]?.id;
    if (!vehicleId) {
      const created = await directusJson("/items/vehicles", {
        method: "POST",
        body: JSON.stringify({
          slug: vehicle.slug,
          name: vehicle.name,
          category: vehicle.category,
          segment: vehicle.segment,
          status: "draft",
          sort: vehicle.sort,
          ...payload,
        }),
      });
      vehicleId = created.data.id;
      console.log(`created ${vehicle.slug}`);
    } else {
      await directusJson(`/items/vehicles/${vehicleId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      console.log(`updated files ${vehicle.slug}`);
    }

    const colorCount = await directusJson(
      `/items/vehicle_colors?filter[vehicle][_eq]=${vehicleId}&aggregate[count]=id`
    );
    const existingColors = Number(colorCount.data?.[0]?.count?.id || 0);
    if (existingColors === 0) {
      for (const color of vehicle.colors) {
        const image = await uploadLocal(color.image, folderId);
        if (!image) continue;
        await directusJson("/items/vehicle_colors", {
          method: "POST",
          body: JSON.stringify({
            vehicle: vehicleId,
            name: color.name,
            hex: color.hex,
            kind: color.kind || "exterior",
            image,
            sort: color.sort ?? 0,
          }),
        });
      }
    }

    const sectionCount = await directusJson(
      `/items/vehicle_sections?filter[vehicle][_eq]=${vehicleId}&aggregate[count]=id`
    );
    const existingSections = Number(sectionCount.data?.[0]?.count?.id || 0);
    if (existingSections === 0) {
      for (const section of vehicle.sections) {
        const image = await uploadLocal(section.image, folderId);
        if (!image) continue;
        await directusJson("/items/vehicle_sections", {
          method: "POST",
          body: JSON.stringify({
            vehicle: vehicleId,
            section: section.section,
            title: section.title,
            subtitle: section.subtitle || null,
            description: section.description || null,
            image,
            sort: section.sort ?? 0,
          }),
        });
      }
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
