import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الكوبونات",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="">{children}</div>;
}
