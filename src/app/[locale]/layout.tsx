"use client";

import TMSideBarMenu from "@/customComponents/TMSideBarMenu/TMSideBarMenu";
import SplashCursor from '@/lib/styles/SplashCursor/SplashCursor'
import TMInfoSideBar from "@/customComponents/TMInfoSideBar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing, usePathname } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import RootLayoutClient from "./RootLayoutClient";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { apiKeys } from "@/lib/apiKeys";
import WithAuth from "./hoc/WithAuth";
import { Toaster } from "sonner";
import "@/globals.css";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const RootLayout = ({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  const messages = require(`../../../messages/${locale}.json`);
  const pathName = usePathname();
  const excludedPaths = ["/login", "/registration", "/workspace"];
  const shouldShowContent = !excludedPaths.some((path) =>
    pathName.includes(path)
  );
  const isRegistrationPage =
    pathName.includes("/registration") ||
    pathName.includes("/login") ||
    pathName.includes("/workspace");
  const AuthenticatedLayout = isRegistrationPage
    ? () => <>{children}</>
    : WithAuth(() => <>{children}</>);

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-100 dark:bg-black`}
      >
        <NextIntlClientProvider messages={messages} locale={locale} timeZone={apiKeys.NEXT_PUBLIC_TIME_ZONE}>
          <RootLayoutClient>
            {/* <SplashCursor /> */}
            <div className="flex justify-between">
              <div className="flex h-screen fixed z-[60]">
                {shouldShowContent && <TMSideBarMenu />}
              </div>
              <div className="w-full fixed">
                <div
                  className={
                    isRegistrationPage
                      ? `py-10 px-3 h-[100vh]`
                      : `pt-10 pb-32 md:pb-10 max-w-[1450px] 3xl:mx-auto pl-[75px] 3xl:pl-[15px] md:mr-[301px] 3xl:pr-[301px] pr-[15px] h-[100vh] flex-1 overflow-auto`
                  }
                >
                  <AuthenticatedLayout />
                  <Toaster position="top-center" />
                  <Analytics />
                  <SpeedInsights />
                </div>
              </div>

              <div className="h-screen hidden md:flex fixed right-0">
                {shouldShowContent && <TMInfoSideBar />}
              </div>
            </div>
          </RootLayoutClient>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
