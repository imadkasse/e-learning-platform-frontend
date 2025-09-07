import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";
import Footer from "@/components/footer/Footer";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "الدورات",
  description: ".....",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <ToastContainer />
        {children}
        <Footer />
      </div>
    </>
  );
}
