import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "گزارش تراکنش‌ها | Transactions Report",
  description: "سامانه مشاهده و مدیریت تراکنش‌ها",
};

export default function TransactionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="flex flex-1 flex-col">{children}</section>;
}
