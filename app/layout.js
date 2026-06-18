import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://thelasttango2026.vercel.app"),
  title: "MESSI – HÀNH TRÌNH CUỐI",
  description: "Trang fan tôn vinh hành trình 2026. Không liên kết chính thức với Messi hay FIFA.",
  openGraph: {
    title: "MESSI – HÀNH TRÌNH CUỐI",
    description: "Hành trình cuối — 2026. Trang fan.",
    images: ["/messi_hero_crop.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
