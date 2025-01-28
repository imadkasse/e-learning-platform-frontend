import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الطلاب",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
