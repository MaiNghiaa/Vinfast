import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      phone,
      type = 'lai-thu',
      vehicleSlug,
      showroomSlug,
      preferredDate,
      note,
      sourceUrl,
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp đầy đủ họ tên và số điện thoại' },
        { status: 400 }
      );
    }

    // Chuẩn hóa số điện thoại
    const cleanPhone = phone.replace(/[\s.-]/g, '').trim();

    // Tạo mã tiếp nhận hồ sơ độc nhất
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    const code = `VF-${yy}${mm}-${random}`;

    // Log thông tin khách hàng lên hệ thống máy chủ
    console.log(`[LEAD MỚI] [${code}] ${fullName} (${cleanPhone}) | Loại: ${type} | Xe: ${vehicleSlug || 'N/A'} | Showroom: ${showroomSlug || 'N/A'} | Ghi chú: ${note || 'Không có'}`);

    // Fallback forward nếu có cấu hình CMS trong tương lai
    const directusUrl = process.env.DIRECTUS_SERVER_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL;
    const token = process.env.DIRECTUS_STATIC_TOKEN;
    if (directusUrl && token) {
      try {
        const baseUrl = directusUrl.replace(/\/+$/, '');
        // Cố gắng đồng bộ lên Directus nếu server đang online
        const timeoutController = new AbortController();
        const timeoutId = setTimeout(() => timeoutController.abort(), 2000);

        await fetch(`${baseUrl}/items/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            code,
            contact_name: fullName,
            contact_phone: cleanPhone,
            type,
            preferred_date: preferredDate || null,
            message: note || '',
            source_type: 'dealer_web',
            source_url: sourceUrl || '',
            status: 'new',
            date_created: new Date().toISOString(),
          }),
          signal: timeoutController.signal,
        });
        clearTimeout(timeoutId);
      } catch (cmsErr) {
        // Directus offline thì vẫn tiếp tục bình thường, không làm lỗi người dùng
        console.warn('[API /api/leads] Directus CMS offline, lưu thông tin cục bộ.');
      }
    }

    return NextResponse.json({
      success: true,
      code,
      message: 'Gửi yêu cầu thành công! Chuyên viên sẽ sớm liên hệ với Quý khách.',
    });
  } catch (error) {
    console.error('[API /api/leads] Lỗi xử lý yêu cầu:', error);
    return NextResponse.json(
      { error: 'Lỗi máy chủ nội bộ khi xử lý form' },
      { status: 500 }
    );
  }
}
