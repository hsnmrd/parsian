import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const shabnam = localFont({
  src: [
    {
      path: "./fonts/Shabnam-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Shabnam-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Shabnam.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Shabnam-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Shabnam-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "سامانه گزارش تراکنش‌ها | Transactions Report",
  description: "سامانه گزارش و فیلتر تراکنش‌های مالی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={cn("h-full", "antialiased", shabnam.variable, "font-sans")}
    >
      <body className="flex min-h-full flex-col font-sans">
        <NuqsAdapter>
          <QueryProvider>{children}</QueryProvider>
        </NuqsAdapter>
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
