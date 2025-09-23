import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import "@/app/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ReduxProvider } from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AntdThemeProvider from "./AntdThemeProvider";
import MainLayout from "@/components/layout";
import { ClerkProvider } from "@clerk/nextjs";
// import BubbleCursor from "@/components/BubbleCursor";
import { Geist, Geist_Mono } from "next/font/google";
import { type Metadata } from "next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HCM",
  description: "Hồ Chí Minh",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <ClerkProvider>
      <html lang={locale} className="light" suppressHydrationWarning>
        <head>
          <meta name="theme-color" content="#ffffff" />
          {/* ...other head elements... */}
        </head>
        <body
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>
              <ReduxProvider>
                <AntdThemeProvider>
                  <AntdRegistry>
                    <MainLayout>{children}</MainLayout>
                  </AntdRegistry>
                </AntdThemeProvider>
                <ToastContainer />
              </ReduxProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
