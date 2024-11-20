"use client";
import localFont from "next/font/local";
import RootLayoutClient from "./RootLayoutClient";
import "./globals.css";
import WithAuth from "./hoc/WithAuth";
import TMSideBarMenu from "./customComponents/TMSideBarMenu/TMSideBarMenu";
import TMInfoSideBar from "./customComponents/TMInfoSideBar";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Link, routing, usePathname } from "@/i18n/routing";

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

const RootLayout = ({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  const messages = require(`../../../messages/${locale}.json`);
  const pathName = usePathname();
  const excludedPsths = ["/login", "/registration", "/workspace"];
  const shouldShowContent = !excludedPsths.some((path) =>
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray bg-opacity-10`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <RootLayoutClient>
            <div className="flex justify-between">
              <div className="flex h-screen fixed z-[60]">
                {shouldShowContent && <TMSideBarMenu />}
              </div>
              <div className="w-full fixed">
                <div
                  className={
                    isRegistrationPage
                      ? `py-10 px-3 h-[100vh]`
                      : `pt-10 pb-32 md:pb-10 max-w-7xl 3xl:mx-auto pl-[75px] 3xl:pl-[15px] md:mr-[301px] 3xl:pr-[301px] pr-[15px] h-[100vh] flex-1 overflow-auto`
                  }
                >
                  <AuthenticatedLayout />
                  <Toaster position="top-center" />
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
