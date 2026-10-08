"use client";

import React, { useState } from "react";
import { User, Phone, Mail, FileText, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

interface JobApplyFormProps {
  jobTitle: string;
  jobSlug: string;
}

export default function JobApplyForm({ jobTitle, jobSlug }: JobApplyFormProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [note, setNote] = useState("");
  const [agreed, setAgreed] = useState(true);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadCode, setLeadCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert("Vui lòng điền đầy đủ Họ tên và Số điện thoại liên hệ!");
      return;
    }

    setLoading(true);
    try {
      const fullNote = [
        `[ỨNG TUYỂN VIỆC LÀM]`,
        `Vị trí: ${jobTitle}`,
        email ? `Email: ${email}` : "",
        experience ? `Năm sinh / Kinh nghiệm: ${experience}` : "",
        note ? `Ghi chú / Link CV: ${note}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          type: "career",
          vehicleSlug: "",
          showroomSlug: "",
          preferredDate: "",
          note: fullNote,
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      const data = await res.json();
      if (data.code) {
        setLeadCode(data.code);
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Lỗi nộp hồ sơ ứng tuyển:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName("");
    setPhone("");
    setEmail("");
    setExperience("");
    setNote("");
    setLeadCode("");
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3 animate-in fade-in">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h4 className="text-base font-bold text-gray-900">
          Nộp Hồ Sơ Thành Công!
        </h4>
        {leadCode && (
          <div className="inline-block px-3 py-1 bg-white text-emerald-700 rounded-full text-xs font-mono font-bold border border-emerald-200">
            Mã ứng tuyển: {leadCode}
          </div>
        )}
        <p className="text-xs text-gray-600 leading-relaxed">
          Cảm ơn bạn <strong>{fullName}</strong> đã quan tâm ứng tuyển vị trí <strong>{jobTitle}</strong> tại VinFast Phương Đông. Phòng Nhân sự sẽ kiểm tra hồ sơ và liên hệ phỏng vấn trong vòng 24 giờ.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-2 inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
        >
          Nộp hồ sơ khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 1. Họ và tên */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1.5">
          Họ và tên của bạn <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ví dụ: Nguyễn Văn An"
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-50/70 border border-gray-300 rounded-lg text-base md:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#1863dc] focus:ring-2 focus:ring-[#1863dc]/20 transition-all"
          />
        </div>
      </div>

      {/* 2. Số điện thoại */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1.5">
          Số điện thoại liên hệ <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ví dụ: 09xx xxx xxx"
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-50/70 border border-gray-300 rounded-lg text-base md:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#1863dc] focus:ring-2 focus:ring-[#1863dc]/20 transition-all"
          />
        </div>
      </div>

      {/* 3. Email & Năm sinh / Kinh nghiệm (2 cols responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gray-50/70 border border-gray-300 rounded-lg text-base md:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#1863dc] focus:ring-2 focus:ring-[#1863dc]/20 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Năm sinh / Số năm KN
          </label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="VD: 1996 (2 năm KN)"
            className="w-full px-3.5 py-2.5 sm:py-3 bg-gray-50/70 border border-gray-300 rounded-lg text-base md:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#1863dc] focus:ring-2 focus:ring-[#1863dc]/20 transition-all"
          />
        </div>
      </div>

      {/* 4. Link CV / Lời nhắn */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1.5">
          Link CV hoặc Tóm tắt năng lực (tùy chọn)
        </label>
        <div className="relative">
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Dán link Google Drive/TopCV hoặc tóm tắt kinh nghiệm làm việc của bạn..."
            className="w-full px-3.5 py-2.5 sm:py-3 bg-gray-50/70 border border-gray-300 rounded-lg text-base md:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#1863dc] focus:ring-2 focus:ring-[#1863dc]/20 transition-all resize-none"
          />
        </div>
      </div>

      {/* 5. Checkbox đồng ý */}
      <div className="flex items-start gap-2 pt-1">
        <input
          type="checkbox"
          id="career-agreed"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1863dc] focus:ring-[#1863dc] cursor-pointer"
        />
        <label htmlFor="career-agreed" className="text-[11px] text-gray-600 leading-tight cursor-pointer">
          Tôi xác nhận các thông tin cung cấp trên là chính xác và đồng ý để VinFast Phương Đông liên hệ ứng tuyển.
        </label>
      </div>

      {/* 6. Nút nộp hồ sơ */}
      <button
        type="submit"
        disabled={loading || !agreed}
        className="w-full bg-[#1863dc] hover:bg-[#004dd6] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-extrabold py-3 sm:py-3.5 px-6 rounded-lg text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Đang Gửi Hồ Sơ...</span>
          </>
        ) : (
          <>
            <span>GỬI HỒ SƠ ỨNG TUYỂN</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[11px] text-gray-500 text-center">
        * Mọi thông tin ứng tuyển của bạn đều được bảo mật tuyệt đối.
      </p>
    </form>
  );
}
