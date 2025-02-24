import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Next+Ts+ShadcnUI',
  description: 'Next.js + TypeScript + ShadcnUI',
  keywords: 'Fontend Developer, Portfolio, Sumangal Karan, Web Developer, Designer, Next.js, TypeScript, ShadcnUI',
  authors: [{ name: 'Sumangal Karan', url: 'https://devsumangal.netlify.app/' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.yourwebsite.com',
    siteName: 'Designer Name Portfolio',
    images: [
      {
        url: 'https://www.yourwebsite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Next.js + TypeScript + ShadcnUI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourtwitterhandle',
    creator: '@yourtwitterhandle',
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
                  <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>

      </body>
    </html>
  );
}
