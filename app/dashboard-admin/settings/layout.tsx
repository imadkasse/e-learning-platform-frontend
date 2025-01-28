import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الأعدادات",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
