import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الإدارة",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
