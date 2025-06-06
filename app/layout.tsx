import type { Metadata } from "next";
import "./globals.css";

// import Footer from "@/components/footer/Footer";
// import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "الرئيسية",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className={` antialiased `}>
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
