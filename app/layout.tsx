import type { Metadata } from "next";
import {
  defaultSocialMetadata,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/metadata";
import "./globals.css";

// 파비콘은 app/favicon.ico 파일 규칙으로 Next.js가 <link rel="icon">을 자동으로 넣는다
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  ...defaultSocialMetadata,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
