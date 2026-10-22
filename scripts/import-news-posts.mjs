import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DIRECTUS_URL, directusJson, ensureFolder, getAuthToken } from "./directus-client.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcDir = "C:/Users/legot/.cursor/projects/c-Users-legot-OneDrive-Desktop-Vinfast/assets";
const destDir = path.join(root, "public", "images", "news");

const posts = [
  {
    slug: "uu-dai-chinh-hang-vinfast-phuong-dong",
    title: "Ưu đãi chính hãng tại VinFast Phương Đông",
    category: "uu-dai",
    excerpt:
      "Đại lý ủy quyền VinFast tại Hà Nội. Giá bán và ưu đãi theo chính sách hãng, tư vấn minh bạch tại 4 showroom.",
    content: `<p>VinFast Phương Đông là đại lý được VinFast ủy quyền tại Hà Nội. Giá bán và chương trình ưu đãi áp dụng theo chính sách hãng, tư vấn trực tiếp tại showroom.</p>
<p>Khách có thể đến 4 điểm: Hoàng Quốc Việt (số 14 Hoàng Quốc Việt, Cầu Giấy), Bát Tràng (268 Đường Giáp Hải), Thường Tín (207 Quán Gánh) và Hòa Lạc (Tầng 1, Hòa Lạc Mall).</p>
<p>Hotline <strong>090 242 25 22</strong>. Giờ bán hàng 08:00–18:00, tất cả các ngày trong tuần.</p>`,
    published_at: "2026-10-01T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "ho-tro-tai-chinh-va-phuong-an-pin",
    title: "Hỗ trợ tài chính và phương án pin tại Phương Đông",
    category: "uu-dai",
    excerpt:
      "Tư vấn trả góp qua ngân hàng liên kết, gói thuê pin hoặc mua pin, kèm hỗ trợ giao xe và thủ tục đăng ký, đăng kiểm.",
    content: `<p>VinFast Phương Đông hỗ trợ khách chọn phương án tài chính qua ngân hàng liên kết, cùng gói thuê pin hoặc mua pin phù hợp nhu cầu sử dụng.</p>
<p>Đội ngũ tư vấn đồng thời hỗ trợ giao xe tận nơi và thủ tục đăng ký, đăng kiểm.</p>
<p>Liên hệ hotline <strong>090 242 25 22</strong> hoặc đến showroom gần nhất để được báo phương án cụ thể theo chính sách đang áp dụng.</p>`,
    published_at: "2026-10-08T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "vinh-danh-tu-van-hoang-quoc-viet",
    title: "Vinh danh tư vấn bán hàng Showroom Hoàng Quốc Việt",
    category: "tin-noi-bo",
    excerpt:
      "Showroom VinFast Phương Đông Hoàng Quốc Việt được ghi nhận tư vấn bán hàng xuất sắc năm 2025, tháng 12/2025 và tháng 05/2026.",
    content: `<p>Showroom VinFast Phương Đông Hoàng Quốc Việt, số 14 Hoàng Quốc Việt, Cầu Giấy, Hà Nội, được ghi nhận ở hạng mục tư vấn bán hàng xuất sắc năm 2025, xuất sắc nhất tháng 12/2025 và xuất sắc tháng 05/2026.</p>
<p>Đây là điểm 3S, vừa bán hàng vừa có xưởng dịch vụ. Giờ bán hàng 08:00–18:00, giờ xưởng 08:00–17:30.</p>`,
    published_at: "2026-05-20T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "ky-thuat-vien-xuong-dich-vu-3s",
    title: "Kỹ thuật viên xưởng dịch vụ chuẩn 3S",
    category: "tin-noi-bo",
    excerpt:
      "Kỹ thuật viên được VinFast đào tạo. Ba xưởng chuẩn 3S tại Hoàng Quốc Việt, Bát Tràng và Thường Tín. Giờ xưởng 08:00–17:30.",
    content: `<p>Kỹ thuật viên tại VinFast Phương Đông được VinFast đào tạo, làm việc trên trang thiết bị theo tiêu chuẩn hãng.</p>
<p>Ba xưởng dịch vụ chuẩn 3S đặt tại Hoàng Quốc Việt, Bát Tràng và Thường Tín, nhận bảo hành, bảo dưỡng, sửa chữa và đồng sơn. Phụ tùng, phụ kiện là hàng chính hãng.</p>
<p>Giờ xưởng 08:00–17:30. Hotline <strong>090 242 25 22</strong>.</p>`,
    published_at: "2026-09-15T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "trai-nghiem-xe-tai-bon-showroom-ha-noi",
    title: "Trải nghiệm xe tại 4 showroom Hà Nội",
    category: "su-kien",
    excerpt:
      "Bốn điểm VinFast Phương Đông: Hoàng Quốc Việt, Bát Tràng, Thường Tín và Hòa Lạc. Hotline 090 242 25 22, giờ bán hàng 08:00–18:00.",
    content: `<p>VinFast Phương Đông có 4 showroom tại Hà Nội để khách xem xe và lái thử:</p>
<ul>
<li>Hoàng Quốc Việt — 3S, số 14 Hoàng Quốc Việt, Cầu Giấy</li>
<li>Bát Tràng — 3S, 268 Đường Giáp Hải, Gia Lâm</li>
<li>Thường Tín — 3S, 207 Quán Gánh</li>
<li>Hòa Lạc — Showroom, tầng 1 Hòa Lạc Mall</li>
</ul>
<p>Giờ bán hàng 08:00–18:00 cả tuần. Hotline <strong>090 242 25 22</strong>.</p>`,
    published_at: "2026-10-15T08:00:00.000Z",
    is_featured: true,
  },
  {
    slug: "giao-xe-tan-noi-dang-ky-dang-kiem",
    title: "Giao xe tận nơi và hỗ trợ đăng ký, đăng kiểm",
    category: "uu-dai",
    excerpt:
      "VinFast Phương Đông giao xe tận nhà và hỗ trợ thủ tục đăng ký, đăng kiểm cho khách tại Hà Nội.",
    content: `<p>Khi nhận xe tại VinFast Phương Đông, khách được hỗ trợ giao xe tận nơi cùng thủ tục đăng ký và đăng kiểm.</p>
<p>Đội ngũ tư vấn sắp lịch giao theo địa chỉ khách chọn và hướng dẫn hồ sơ cần chuẩn bị.</p>
<p>Hotline <strong>090 242 25 22</strong>. Giờ bán hàng 08:00–18:00, tất cả các ngày trong tuần.</p>`,
    published_at: "2026-10-18T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "phu-tung-phu-kien-chinh-hang",
    title: "Phụ tùng và phụ kiện chính hãng VinFast",
    category: "uu-dai",
    excerpt:
      "Phụ tùng, phụ kiện chính hãng tại 3 xưởng 3S. Lắp đặt đúng tiêu chuẩn để giữ trọn bảo hành.",
    content: `<p>VinFast Phương Đông cung cấp phụ tùng và phụ kiện chính hãng VinFast tại các xưởng dịch vụ chuẩn 3S.</p>
<p>Linh kiện được lắp bởi kỹ thuật viên VinFast đào tạo, giúp xe giữ điều kiện bảo hành.</p>
<p>Ba xưởng nhận phụ tùng: Hoàng Quốc Việt, Bát Tràng và Thường Tín. Giờ xưởng 08:00–17:30. Hotline <strong>090 242 25 22</strong>.</p>`,
    published_at: "2026-10-20T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "tru-so-cong-ty-co-phan-phuong-dong",
    title: "Trụ sở Công ty Cổ phần Phương Đông",
    category: "tin-noi-bo",
    excerpt:
      "Trụ sở tại G2 Vinhomes Green Bay, Mễ Trì, Nam Từ Liêm, Hà Nội. Email cskh@vinfastphuongdong.com.vn.",
    content: `<p>Công ty Cổ phần Phương Đông đặt trụ sở tại G2 Vinhomes Green Bay, Mễ Trì, Nam Từ Liêm, Hà Nội.</p>
<p>Khách liên hệ chăm sóc qua hotline <strong>090 242 25 22</strong> hoặc email <strong>cskh@vinfastphuongdong.com.vn</strong>.</p>
<p>Giờ bán hàng 08:00–18:00. Giờ xưởng dịch vụ 08:00–17:30. Giám định viên bảo hiểm trực tại xưởng, khách gọi hotline dịch vụ để được hướng dẫn.</p>`,
    published_at: "2026-09-01T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "tu-van-chon-xe-den-nhan-xe",
    title: "Đồng hành từ lúc chọn xe đến khi nhận xe",
    category: "tin-noi-bo",
    excerpt:
      "Tư vấn viên VinFast Phương Đông đi cùng khách từ chọn xe, lái thử, tài chính cho tới lúc giao xe.",
    content: `<p>Đội ngũ tư vấn VinFast Phương Đông được đào tạo bài bản, am hiểu từng dòng xe điện đang phân phối.</p>
<p>Khách được hỗ trợ xuyên suốt: chọn xe, đặt lịch lái thử, phương án tài chính, rồi nhận xe và thủ tục đăng ký.</p>
<p>Có thể gặp tư vấn tại Hoàng Quốc Việt, Bát Tràng, Thường Tín hoặc Hòa Lạc. Hotline <strong>090 242 25 22</strong>.</p>`,
    published_at: "2026-09-20T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "xem-xe-cuoi-tuan-tai-showroom",
    title: "Xem xe cuối tuần tại showroom Phương Đông",
    category: "su-kien",
    excerpt:
      "Showroom mở cửa cả thứ Bảy và Chủ nhật, 08:00–18:00, để khách xem xe và đặt lịch lái thử.",
    content: `<p>Bốn showroom VinFast Phương Đông mở cửa cuối tuần, khung giờ bán hàng 08:00–18:00.</p>
<p>Khách có thể xem xe trưng bày và đăng ký lái thử các dòng đang có tại điểm gần nhà, trong đó có VF 3, VF 6, VF 7 và VF 8.</p>
<p>Nên gọi trước hotline <strong>090 242 25 22</strong> để showroom giữ xe lái thử đúng mẫu.</p>`,
    published_at: "2026-10-12T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "tham-quan-xuong-dich-vu-3s",
    title: "Tham quan xưởng dịch vụ chuẩn 3S",
    category: "su-kien",
    excerpt:
      "Khách có thể ghé xưởng 3S tại Hoàng Quốc Việt, Bát Tràng và Thường Tín trong giờ 08:00–17:30.",
    content: `<p>Ba xưởng dịch vụ chuẩn 3S của VinFast Phương Đông nhận khách tham quan khu vực tiếp nhận xe, bảo dưỡng và khu phụ tùng.</p>
<ul>
<li>Hoàng Quốc Việt — số 14 Hoàng Quốc Việt, Cầu Giấy</li>
<li>Bát Tràng — 268 Đường Giáp Hải, Gia Lâm</li>
<li>Thường Tín — 207 Quán Gánh</li>
</ul>
<p>Giờ xưởng 08:00–17:30. Liên hệ <strong>090 242 25 22</strong> trước khi đến.</p>`,
    published_at: "2026-10-05T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "lich-lai-thu-vinfast-thinh-cuong-thang-9-2026-thu-7-hanh-phuc",
    title: "LỊCH LÁI THỬ VINFAST PHƯƠNG ĐÔNG THÁNG 9/2026 – THỨ 7 HẠNH PHÚC",
    file: "lich-lai-thu-vinfast-phuong-dong.jpg",
    thumbnailOnly: true,
  },
  {
    slug: "bao-hanh-chinh-hang-7-nam",
    title: "Bảo hành chính hãng lên đến 7 năm",
    category: "uu-dai",
    excerpt: "Xe điện phân phối tại VinFast Phương Đông được bảo hành theo chính sách hãng, thời hạn lên đến 7 năm.",
    content: `<p>VinFast Phương Đông là đại lý ủy quyền, nên chế độ bảo hành áp dụng theo chính sách hãng. Thời hạn bảo hành xe lên đến 7 năm.</p><p>Khách bảo dưỡng, sửa chữa tại 3 xưởng chuẩn 3S: Hoàng Quốc Việt, Bát Tràng và Thường Tín.</p><p>Giờ xưởng 08:00–17:30. Hotline <strong>090 242 25 22</strong>.</p>`,
    published_at: "2026-10-22T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "giam-dinh-bao-hiem-tai-xuong",
    title: "Giám định bảo hiểm ngay tại xưởng dịch vụ",
    category: "uu-dai",
    excerpt: "Giám định viên bảo hiểm trực tại xưởng dịch vụ VinFast Phương Đông. Khách gọi hotline để được hướng dẫn.",
    content: `<p>Giám định viên bảo hiểm trực tại xưởng dịch vụ của VinFast Phương Đông, giúp khách xử lý hồ sơ ngay tại điểm sửa chữa.</p><p>Xưởng nhận giám định thuộc các điểm 3S: Hoàng Quốc Việt, Bát Tràng và Thường Tín.</p><p>Hotline <strong>090 242 25 22</strong>. Giờ xưởng 08:00–17:30.</p>`,
    published_at: "2026-10-21T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "doi-ngu-tu-van-bon-showroom",
    title: "Đội ngũ tư vấn tại 4 showroom Hà Nội",
    category: "tin-noi-bo",
    excerpt: "Tư vấn viên VinFast Phương Đông có mặt tại Hoàng Quốc Việt, Bát Tràng, Thường Tín và Hòa Lạc.",
    content: `<p>Mỗi showroom VinFast Phương Đông có đội ngũ tư vấn được đào tạo.</p><ul><li>Hoàng Quốc Việt — số 14 Hoàng Quốc Việt, Cầu Giấy</li><li>Bát Tràng — 268 Đường Giáp Hải, Gia Lâm</li><li>Thường Tín — 207 Quán Gánh</li><li>Hòa Lạc — tầng 1 Hòa Lạc Mall</li></ul><p>Hotline <strong>090 242 25 22</strong>.</p>`,
    published_at: "2026-09-10T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "gio-phuc-vu-showroom-va-xuong",
    title: "Giờ phục vụ showroom và xưởng dịch vụ",
    category: "tin-noi-bo",
    excerpt: "Bán hàng 08:00–18:00 cả tuần. Xưởng dịch vụ 08:00–17:30. Hotline 090 242 25 22.",
    content: `<p>Showroom mở cửa bán hàng từ 08:00 đến 18:00, tất cả các ngày trong tuần.</p><p>Xưởng dịch vụ chuẩn 3S làm việc từ 08:00 đến 17:30. Hotline <strong>090 242 25 22</strong>.</p><p>Email: <strong>cskh@vinfastphuongdong.com.vn</strong>.</p>`,
    published_at: "2026-09-02T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "lai-thu-cac-dong-xe-dien",
    title: "Lái thử các dòng xe điện tại Phương Đông",
    category: "su-kien",
    excerpt: "Khách đăng ký lái thử VF 3, VF 6, VF 7 và VF 8 tại showroom gần nhất.",
    content: `<p>VinFast Phương Đông sắp xe lái thử VF 3, VF 6, VF 7 và VF 8.</p><p>Khách gọi trước hotline <strong>090 242 25 22</strong> để giữ đúng mẫu. Giờ bán hàng 08:00–18:00.</p>`,
    published_at: "2026-10-11T08:00:00.000Z",
    is_featured: false,
  },
  {
    slug: "le-ban-giao-xe-tai-showroom",
    title: "Bàn giao xe tại showroom Phương Đông",
    category: "su-kien",
    excerpt: "Khách nhận xe tại showroom, được hướng dẫn vận hành và hoàn tất thủ tục trước khi rời điểm giao.",
    content: `<p>Khi bàn giao xe tại showroom, tư vấn viên hướng dẫn thao tác cơ bản và kiểm tra hồ sơ cùng khách.</p><p>Nhận xe tại Hoàng Quốc Việt, Bát Tràng, Thường Tín hoặc Hòa Lạc. Hotline <strong>090 242 25 22</strong>.</p>`,
    published_at: "2026-10-19T08:00:00.000Z",
    is_featured: false,
  },
];

fs.mkdirSync(destDir, { recursive: true });

async function uploadLocal(filePath, title) {
  const folderId = await ensureFolder("posts");
  const buffer = fs.readFileSync(filePath);
  const formData = new FormData();
  formData.append("file", new Blob([buffer], { type: "image/jpeg" }), path.basename(filePath));
  formData.append("folder", folderId);
  formData.append("title", title);
  const token = await getAuthToken();
  const res = await fetch(`${DIRECTUS_URL}/files`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error(`Upload failed ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.data.id;
}

const only = process.argv.slice(2);
const selected = only.length ? posts.filter((post) => only.includes(post.slug)) : posts;

for (const post of selected) {
  const fileName = post.file || `${post.slug}.jpg`;
  const dest = path.join(destDir, fileName);
  if (!fs.existsSync(dest)) throw new Error(`Missing image ${dest}`);

  const fileId = await uploadLocal(dest, post.title);
  if (post.thumbnailOnly) {
    const existing = await directusJson(
      `/items/posts?filter[slug][_eq]=${encodeURIComponent(post.slug)}&fields=id&limit=1`
    );
    if (!existing.data?.length) throw new Error(`Missing post ${post.slug}`);
    await directusJson(`/items/posts/${existing.data[0].id}`, {
      method: "PATCH",
      body: JSON.stringify({ thumbnail: fileId }),
    });
    console.log(`thumb ${post.slug} -> file ${fileId}`);
    continue;
  }
  const payload = {
    slug: post.slug,
    title: post.title,
    title_en: post.title,
    category: post.category,
    excerpt: post.excerpt,
    excerpt_en: post.excerpt,
    content: post.content,
    content_en: post.content,
    thumbnail: fileId,
    published_at: post.published_at,
    author_name: "VinFast Phương Đông",
    is_featured: post.is_featured,
    reading_minutes: 3,
    share_to_sales: "excerpt",
    status: "published",
    seo_title: post.title,
    seo_description: post.excerpt,
  };

  const existing = await directusJson(
    `/items/posts?filter[slug][_eq]=${encodeURIComponent(post.slug)}&fields=id&limit=1`
  );
  if (existing.data?.length) {
    await directusJson(`/items/posts/${existing.data[0].id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    console.log(`updated ${post.slug} -> file ${fileId}`);
  } else {
    const created = await directusJson("/items/posts", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    console.log(`created ${post.slug} id ${created.data.id} file ${fileId}`);
  }
}
