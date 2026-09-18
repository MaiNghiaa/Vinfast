import { NextResponse } from 'next/server';
import { DIRECTUS_SERVER_URL, DIRECTUS_STATIC_TOKEN } from '@/lib/directus';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      phone,
      type = 'test_drive',
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

    // Normalize phone number (remove spaces, dots, dashes)
    const cleanPhone = phone.replace(/[\s.-]/g, '').trim();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DIRECTUS_STATIC_TOKEN}`,
    };

    const baseUrl = DIRECTUS_SERVER_URL.replace(/\/+$/, '');

    // 1. Find or create customer
    const filterPhone = encodeURIComponent(JSON.stringify({ phone: { _eq: cleanPhone } }));
    const customerRes = await fetch(`${baseUrl}/items/customers?filter=${filterPhone}`, { headers });
    let customerId: number | null = null;

    if (customerRes.ok) {
      const custData = await customerRes.json();
      if (custData.data && custData.data.length > 0) {
        customerId = custData.data[0].id;
      }
    }

    if (!customerId) {
      const createCust = await fetch(`${baseUrl}/items/customers`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          phone: cleanPhone,
          full_name: fullName,
          first_source_type: 'dealer_web',
          consent_at: new Date().toISOString(),
          date_created: new Date().toISOString(),
        }),
      });

      if (createCust.ok) {
        const newCust = await createCust.json();
        customerId = newCust.data.id;
      }
    }

    // 2. Map vehicle ID if slug provided
    let vehicleId: number | null = null;
    if (vehicleSlug) {
      const filterVeh = encodeURIComponent(JSON.stringify({ slug: { _eq: vehicleSlug } }));
      const vRes = await fetch(`${baseUrl}/items/vehicles?filter=${filterVeh}&fields=id`, { headers });
      if (vRes.ok) {
        const vData = await vRes.json();
        if (vData.data?.[0]?.id) vehicleId = vData.data[0].id;
      }
    }

    // 3. Map showroom ID if slug provided
    let showroomId: number | null = null;
    if (showroomSlug) {
      const filterSr = encodeURIComponent(JSON.stringify({ slug: { _eq: showroomSlug } }));
      const srRes = await fetch(`${baseUrl}/items/showrooms?filter=${filterSr}&fields=id`, { headers });
      if (srRes.ok) {
        const srData = await srRes.json();
        if (srData.data?.[0]?.id) showroomId = srData.data[0].id;
      }
    }

    // 4. Generate lead code
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    const code = `LD-${yy}${mm}-${random}`;

    // 5. Map frontend type to Directus lead type
    let leadType = 'contact';
    if (type === 'lai-thu' || type === 'test_drive') leadType = 'test_drive';
    else if (type === 'bao-gia' || type === 'quote') leadType = 'quote';
    else if (type === 'dich-vu' || type === 'service') leadType = 'service';
    else if (type === 'rolling_cost') leadType = 'rolling_cost';
    else if (type === 'installment') leadType = 'installment';
    else if (type === 'used_car') leadType = 'used_car';
    else if (type === 'charging_station') leadType = 'charging_station';

    // 6. Create lead in Directus
    const leadPayload = {
      code,
      customer: customerId,
      contact_name: fullName,
      contact_phone: cleanPhone,
      type: leadType,
      vehicle: vehicleId,
      showroom: showroomId,
      preferred_date: preferredDate || null,
      message: note || '',
      source_type: 'dealer_web',
      source_url: sourceUrl || '',
      status: 'new',
      consent: true,
      consent_at: new Date().toISOString(),
      date_created: new Date().toISOString(),
    };

    const leadRes = await fetch(`${baseUrl}/items/leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify(leadPayload),
    });

    if (!leadRes.ok) {
      const errText = await leadRes.text();
      console.error('[API /api/leads] Directus error:', errText);
      return NextResponse.json(
        { error: 'Không thể lưu lead vào hệ thống', details: errText },
        { status: 500 }
      );
    }

    const leadData = await leadRes.json();
    return NextResponse.json({
      success: true,
      code,
      leadId: leadData.data?.id,
    });
  } catch (error) {
    console.error('[API /api/leads] Server error:', error);
    return NextResponse.json(
      { error: 'Lỗi máy chủ nội bộ khi xử lý form' },
      { status: 500 }
    );
  }
}
