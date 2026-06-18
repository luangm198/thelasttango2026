"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle");

  async function submit(e) {
    e.preventDefault();
    if (!consent) { setStatus("need-consent"); return; }
    setStatus("loading");
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(r.ok ? "done" : "error");
    } catch { setStatus("error"); }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <section className="relative flex-1 flex items-center justify-center overflow-hidden">
        <img
          src="/messi_hero_crop.png"
          alt="Messi 2026"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center px-6 max-w-xl mx-auto py-24">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none">
            MESSI — HÀNH TRÌNH CUỐI
          </h1>
          <p className="mt-3 text-2xl font-light text-neutral-300">2026</p>

          {status === "done" ? (
            <p className="mt-10 text-xl text-green-400">Cảm ơn! Hẹn gặp lại trong hộp thư của bạn.</p>
          ) : (
            <form onSubmit={submit} className="mt-10 flex flex-col gap-3 items-center">
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email của bạn"
                className="w-full px-5 py-3 rounded-md text-black text-lg"
              />
              <label className="flex items-start gap-2 text-sm text-neutral-300 text-left">
                <input type="checkbox" checked={consent}
                  onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
                <span>Tôi đồng ý nhận email cập nhật và đã đọc{" "}
                  <a href="/privacy" className="underline">Chính sách bảo mật</a>.</span>
              </label>
              <button type="submit" disabled={status === "loading"}
                className="w-full px-5 py-3 rounded-md bg-white text-black font-bold text-lg hover:bg-neutral-200 disabled:opacity-50">
                {status === "loading" ? "Đang gửi..." : "ĐĂNG KÝ NHẬN TIN"}
              </button>
              {status === "need-consent" && <p className="text-sm text-yellow-400">Vui lòng tích đồng ý trước.</p>}
              {status === "error" && <p className="text-sm text-red-400">Có lỗi, thử lại nhé.</p>}
            </form>
          )}
        </div>
      </section>

      <footer className="text-center text-xs text-neutral-500 px-6 py-8 space-y-2">
        <p>Trang fan, không liên kết chính thức với Messi hay FIFA.</p>
        <p>
          Ảnh: tác giả Кирило Степаненко — giấy phép CC BY 4.0 — nguồn Wikimedia Commons — đã crop/edited.
        </p>
      </footer>
    </main>
  );
}
