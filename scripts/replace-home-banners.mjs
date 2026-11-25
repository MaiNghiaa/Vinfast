import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DIRECTUS_URL, directusJson, ensureFolder, getAuthToken } from "./directus-client.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const campaigns = [
  {
    file: "Lên đời xe điện chọn xe vinfast.jpg",
    uploadName: "len-doi-xe-dien-chon-vinfast.jpg",
    title: "Lên đời xe điện, chọn VinFast",
    subtitle: "Vì tương lai xanh cùng VinFast Phương Đông",
    badge: "Dải xe điện",
    sort: 1,
    slug: "len-doi-xe-dien-chon-vinfast",
    category: "su-kien",
    excerpt:
      "VinFast Phương Đông giới thiệu dải xe điện từ đô thị đến gia đình và dịch vụ. Khách xem xe, lái thử và được tư vấn mẫu phù hợp nhu cầu đi lại.",
    content: `
      <h2>Lên đời xe điện, chọn VinFast tại Phương Đông</h2>
      <p>Banner <strong>Lên đời xe điện, chọn VinFast</strong> mở đầu trang chủ với thông điệp <strong>Vì tương lai xanh</strong>. Đây là lời mời xem toàn bộ dải xe đang có tại hệ thống VinFast Phương Đông, thay vì chỉ một mẫu đơn lẻ.</p>
      <p>Trên cùng một hình là các nhóm xe mà website đang giới thiệu: xe đô thị <strong>VF 3</strong>, SUV <strong>VF 6</strong>, <strong>VF 7</strong>, <strong>VF 8</strong>, MPV <strong>VF 9</strong>, cùng các dòng dịch vụ và di chuyển xanh như Minio Green, Herio Green, Nerio Green, Limo Green và EC Van. VF Wild xuất hiện như lựa chọn bán tải cho khách cần xe đi địa hình.</p>
      <h2>Cách chọn xe theo nhu cầu</h2>
      <ul>
        <li><strong>Đi phố, đỗ hẹp:</strong> VF 3, kích thước gọn, khoảng sáng gầm 191 mm theo trang sản phẩm.</li>
        <li><strong>Gia đình cần SUV rộng:</strong> VF 8 All New, 5 chỗ, dẫn động hai cầu, quãng đường tham chiếu tới 471 km WLTP ở bản Eco.</li>
        <li><strong>Cần xe dịch vụ hoặc chở khách:</strong> xem nhóm Green và EC Van tại mục sản phẩm.</li>
      </ul>
      <p>Giá, màu và quà tặng lấy theo trang từng mẫu xe và chính sách đang áp dụng. Các chương trình không cộng dồn nếu điều khoản ghi không áp dụng đồng thời.</p>
      <h2>Đến đâu để xem xe</h2>
      <ul>
        <li>Hoàng Quốc Việt — số 14 Hoàng Quốc Việt, Cầu Giấy</li>
        <li>Bát Tràng — 268 Đường Giáp Hải, Gia Lâm</li>
        <li>Thường Tín — 207 Quán Gánh</li>
        <li>Hòa Lạc — tầng 1 Hòa Lạc Mall</li>
      </ul>
      <p>Giờ bán hàng 08:00–18:00. Hotline <strong>090 242 25 22</strong>. Khách nên gọi trước nếu muốn giữ đúng mẫu lái thử.</p>
    `,
  },
  {
    file: "VF8-SUV mới.jpg",
    uploadName: "vf8-d-suv-the-he-moi.jpg",
    title: "VF 8 thế hệ mới, D-SUV cho gia đình",
    subtitle: "Chuẩn D-SUV mới dành cho gia đình Việt",
    badge: "VF 8",
    sort: 2,
    slug: "vf-8-d-suv-the-he-moi",
    category: "danh-gia-xe",
    excerpt:
      "VF 8 All New là D-SUV 5 chỗ trên trang sản phẩm Phương Đông: hai bản Eco và Plus, dẫn động hai cầu, quãng đường WLTP 471 km hoặc 457 km tùy bản.",
    content: `
      <h2>VF 8 thế hệ mới, chuẩn D-SUV cho gia đình Việt</h2>
      <p>Banner giới thiệu <strong>VF 8 thế hệ mới</strong> với dòng chữ <strong>chuẩn D-SUV mới dành cho gia đình Việt</strong>. Trên website VinFast Phương Đông, mẫu này được ghi là <strong>VinFast VF 8 All New</strong>, phân khúc D-SUV, 5 chỗ.</p>
      <h2>Thông số đang niêm yết trên trang sản phẩm</h2>
      <ul>
        <li>Kích thước: 4.750 x 1.934 x 1.667 mm, chiều dài cơ sở 2.950 mm, khoảng sáng gầm 179 mm.</li>
        <li>Pin 87,7 kWh. Sạc nhanh 10–70% trong khoảng 24 phút theo thông số trang xe.</li>
        <li>Bản <strong>VF 8 Eco</strong>: 349 mã lực, 500 Nm, 0–100 km/h trong 5,9 giây, dẫn động AWD, tầm 471 km WLTP.</li>
        <li>Bản <strong>VF 8 Plus</strong>: 402 mã lực, 620 Nm, 0–100 km/h trong 5,5 giây, dẫn động AWD, tầm 457 km WLTP.</li>
        <li>Cả hai bản ghi 11 túi khí và có gói ADAS.</li>
      </ul>
      <p>Trang sản phẩm đang ghi giá tham chiếu VF 8 Eco từ 898.000.000 đồng và VF 8 Plus từ 1.048.000.000 đồng ở cột giá ưu đãi. Đây là số trên website tại thời điểm đăng bài, có thể đổi theo chính sách hãng. Khách đối chiếu lại tại showroom trước khi đặt cọc.</p>
      <h2>Những gì trang cam kết đang ghi</h2>
      <p>Mục cam kết của VF 8 có chương trình tri ân khách xe xăng VinFast lên đến 80 triệu đồng, miễn phí sạc đến 10/02/2029, lãi suất cố định từ 5–7%/năm trong 3 năm, hỗ trợ đăng ký đăng kiểm và giao xe. Các khoản này chỉ áp dụng khi còn trong chính sách và không mặc định cộng dồn với mọi ưu đãi khác.</p>
      <p>Màu đang liệt kê: Đỏ Crimson Red, Trắng Brahminy White, Xanh VinFast Blue, Đen Jet Black. Xem xe và lái thử tại VinFast Phương Đông, hotline <strong>090 242 25 22</strong>.</p>
    `,
  },
  {
    file: "VF-3 SÁNG TẠO CHẤT RIÊNG.jpg",
    uploadName: "vf3-sang-tao-chat-rieng.jpg",
    title: "VF 3 hoàn toàn mới, sáng tạo chất riêng",
    subtitle: "Xe điện mini cho phố, gầm cao 191 mm",
    badge: "VF 3",
    sort: 3,
    slug: "vf-3-sang-tao-chat-rieng",
    category: "danh-gia-xe",
    excerpt:
      "VF 3 là mini e-SUV trên trang Phương Đông: gầm 191 mm, pin LFP 18,64 kWh, quãng đường khoảng 210 km NEDC, ba mức giá niêm yết 2026.",
    content: `
      <h2>VF 3 hoàn toàn mới: sáng tạo chất riêng</h2>
      <p>Banner vẽ VF 3 vàng trên nền phố màu, với câu <strong>Hoàn toàn mới — VF 3 — Sáng tạo chất riêng</strong>. Đúng với cách trang sản phẩm mô tả: xe điện mini, dáng gọn, hợp đường hẹp và chỗ đỗ trong phố.</p>
      <h2>Thông số trên trang VF 3</h2>
      <ul>
        <li>Kích thước niêm yết ở khối thông số: 3.114 x 1.673 x 1.567 mm. Chiều dài cơ sở 2.075 mm.</li>
        <li>Khoảng sáng gầm 191 mm, cao hơn nhiều xe mini thông thường, dùng khi qua gờ và mặt đường không bằng.</li>
        <li>Động cơ điện 43 mã lực (32 kW), mô-men 110 Nm, dẫn động cầu sau. 0–50 km/h trong 5,3 giây theo bảng phiên bản.</li>
        <li>Pin LFP 18,64 kWh. Quãng đường khoảng 210 km một lần sạc theo điều kiện NEDC. Sạc nhanh 10–70% khoảng 36 phút.</li>
      </ul>
      <h2>Ba mức giá đang có trên bảng 2026</h2>
      <ul>
        <li>VF3 TC1 2026: giá ưu đãi 281.060.000 đồng, giá gốc ghi 299.000.000 đồng.</li>
        <li>VF3 Eco (TC2) 2026: giá ưu đãi 283.880.000 đồng, giá gốc ghi 302.000.000 đồng.</li>
        <li>VF3 Plus 2026: giá ưu đãi 296.100.000 đồng, giá gốc ghi 315.000.000 đồng.</li>
      </ul>
      <p>Bản Plus trên bảng so sánh có Android Auto và Apple CarPlay. Màu minh họa trên trang gồm vàng, hồng, tím, xanh và trắng. Số liệu lấy từ trang sản phẩm của website, cần xác nhận lại khi báo giá vì chính sách có thể đổi.</p>
      <p>Trang cam kết VF 3 còn ghi bảo hành xe 7 năm hoặc 160.000 km và bảo hành pin 8 năm hoặc 160.000 km, miễn phí sạc đến 10/02/2029. Đăng ký lái thử tại showroom Phương Đông, hotline <strong>090 242 25 22</strong>.</p>
    `,
  },
  {
    file: "Vinfast-WILD.jpg",
    uploadName: "vinfast-wild-chat-dan-dau.jpg",
    title: "VinFast Wild, chất của người dẫn đầu",
    subtitle: "Bán tải điện cho khách cần đi đường khó",
    badge: "WILD",
    sort: 4,
    slug: "vinfast-wild-chat-cua-nguoi-dan-dau",
    category: "su-kien",
    excerpt:
      "Banner Wild mang thông điệp chất của người dẫn đầu. Trên catalog website, VF Wild là bán tải điện REEV và chưa có bảng thông số chi tiết để công bố giá.",
    content: `
      <h2>VinFast Wild: chất của người dẫn đầu</h2>
      <p>Ảnh banner cho thấy một bán tải VinFast đi qua nước, logo <strong>WILD</strong> và câu <strong>Chất của người dẫn đầu</strong>. Hình dùng để nói về tư thế cầm lái và khả năng đi đường khó, không phải một bảng giá.</p>
      <h2>Những gì website đang có về VF Wild</h2>
      <p>Trong dữ liệu sản phẩm của site, <strong>VinFast VF Wild</strong> được xếp phân khúc bán tải điện REEV. Hồ sơ đang ở trạng thái nháp, chưa có mục thông số vận hành, chưa có giá niêm yết và chưa có danh sách phiên bản. Vì vậy bài này không đưa số mã lực, tầm hoạt động hay giá bán.</p>
      <p>Khách quan tâm Wild có thể để lại nhu cầu tại VinFast Phương Đông để được báo khi hãng mở nhận cọc hoặc mở lái thử. Trong lúc chờ, showroom vẫn có VF 8 nếu cần SUV gia đình hai cầu ngay, và VF 3 nếu cần xe phố.</p>
      <p>Bốn điểm tiếp nhận: Hoàng Quốc Việt, Bát Tràng, Thường Tín và Hòa Lạc. Hotline <strong>090 242 25 22</strong>, giờ bán hàng 08:00–18:00.</p>
    `,
  },
  {
    file: "VINFAST thu xăng đổi điện.jpg",
    uploadName: "thu-xang-doi-dien.jpg",
    title: "Thu xăng đổi điện",
    subtitle: "Ưu đãi tới 9%, voucher tới 80 triệu, hỗ trợ vay tới 100%",
    badge: "Ưu đãi",
    sort: 5,
    slug: "thu-xang-doi-dien",
    category: "uu-dai",
    excerpt:
      "Banner Thu xăng đổi điện ghi ba mức: ưu đãi tới 9% theo dòng xe, voucher chuyển đổi xanh tới 80 triệu đồng, hỗ trợ vay tới 100% giá trị xe. Các mức không áp dụng đồng thời.",
    content: `
      <h2>Thu xăng đổi điện</h2>
      <p>Banner <strong>Thu xăng đổi điện</strong> nằm trong chuỗi <strong>Vì tương lai xanh</strong>. Hình có VF 9, VF Wild, một xe đô thị và VF 8, kèm ba ô ưu đãi viết sẵn trên ảnh.</p>
      <h2>Ba mức ghi trên banner</h2>
      <ul>
        <li><strong>Ưu đãi tới 9%</strong>, áp dụng theo từng dòng xe, không phải mọi xe đều giảm 9%.</li>
        <li><strong>Voucher chuyển đổi xanh lên tới 80 triệu đồng.</strong> Trang VF 8 và VF 3 của website cũng ghi chương trình tri ân khách xe xăng VinFast lên đến 80 triệu đồng.</li>
        <li><strong>Hỗ trợ vay tới 100% giá trị xe.</strong> Mức vay phụ thuộc hồ sơ khách và ngân hàng liên kết, không phải khoản showroom tự duyệt.</li>
      </ul>
      <p>Dòng chú thích trên banner nói rõ: một số chính sách không áp dụng đồng thời. Chương trình áp dụng điều kiện và điều khoản. Khi tư vấn, nhân viên Phương Đông sẽ chỉ ra khoản nào đang còn hiệu lực với đúng mẫu xe khách chọn, thay vì cộng cả ba mức vào một báo giá.</p>
      <h2>Việc khách cần chuẩn bị</h2>
      <p>Mang giấy tờ xe xăng nếu muốn hỏi gói thu cũ đổi mới, và giấy tờ cá nhân nếu cần phương án vay. Giá xe lấy theo báo giá trong ngày tại showroom.</p>
      <p>Liên hệ hotline <strong>090 242 25 22</strong> hoặc đến Hoàng Quốc Việt, Bát Tràng, Thường Tín, Hòa Lạc. Giờ bán hàng 08:00–18:00.</p>
    `,
  },
];

async function uploadFile(filePath, uploadName, title) {
  const folderId = await ensureFolder("banners");
  const buffer = fs.readFileSync(filePath);
  const form = new FormData();
  form.append("file", new Blob([buffer], { type: "image/jpeg" }), uploadName);
  form.append("folder", folderId);
  form.append("title", title);
  const token = await getAuthToken();
  const res = await fetch(`${DIRECTUS_URL}/files`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) {
    throw new Error(`Upload ${uploadName} failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return data.data.id;
}

const existing = await directusJson("/items/banners?fields=id,title&limit=-1");
for (const banner of existing.data || []) {
  await directusJson(`/items/banners/${banner.id}`, { method: "DELETE" });
  console.log(`deleted banner ${banner.id} ${banner.title}`);
}

for (const item of campaigns) {
  const filePath = path.join(root, item.file);
  const fileId = await uploadFile(filePath, item.uploadName, item.title);
  const banner = await directusJson("/items/banners", {
    method: "POST",
    body: JSON.stringify({
      title: item.title,
      subtitle: item.subtitle,
      type: "hero",
      image: fileId,
      link: `/tin-tuc/${item.slug}`,
      badge: item.badge,
      status: "published",
      sort: item.sort,
    }),
  });
  const duplicate = await directusJson(
    `/items/posts?filter[slug][_eq]=${encodeURIComponent(item.slug)}&fields=id`,
  );
  const postBody = {
    slug: item.slug,
    title: item.title,
    category: item.category,
    excerpt: item.excerpt,
    content: item.content.trim(),
    thumbnail: fileId,
    published_at: new Date(Date.now() - item.sort * 60_000).toISOString(),
    author_name: "VinFast Phương Đông",
    is_featured: item.sort <= 2,
    status: "published",
    seo_title: item.title,
    seo_description: item.excerpt,
  };
  if (duplicate.data?.length) {
    await directusJson(`/items/posts/${duplicate.data[0].id}`, {
      method: "PATCH",
      body: JSON.stringify(postBody),
    });
    console.log(`updated post ${item.slug}`);
  } else {
    await directusJson("/items/posts", {
      method: "POST",
      body: JSON.stringify(postBody),
    });
    console.log(`created post ${item.slug}`);
  }
  console.log(`banner ${banner.data.id} file ${fileId} -> /tin-tuc/${item.slug}`);
}
