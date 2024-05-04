import { yekanFont } from "@/utils/fonts/font";

import "./globals.css";

export const metadata = {
  title: "Holoo WebApp",
  description: "New Web Application For Holoo Users",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className={`${yekanFont.className} h-dvh`}>{children}</body>
    </html>
  );
}
