"use client";
import localFont from "next/font/local";
import RootLayoutClient from "./RootLayoutClient";
import "./globals.css";
import WithAuth from "./hoc/WithAuth";
import TMSideBarMenu from "./customComponents/TMSideBarMenu";
import { usePathname } from "next/navigation";
import TMInfoSideBar from "./customComponents/TMInfoSideBar";
import { Toaster } from "sonner";

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
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  const excludedPsths = ['/login', '/registration', '/workspace'];
  const shouldShowContent = !excludedPsths.some((path) => pathName.includes(path));
  const isRegistrationPage = pathName.includes('/registration') || pathName.includes('/login') || pathName.includes('/workspace');
  const AuthenticatedLayout = isRegistrationPage ? (() => <>{children}</>) : WithAuth(() => <>{children}</>);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootLayoutClient>
          <div className="flex">
            <div className="flex h-screen">
              {shouldShowContent && <TMSideBarMenu />}
            </div>
            <div className="flex-1 p-10 bg-gray bg-opacity-10">
                <AuthenticatedLayout />
                <Toaster position="top-right" />
            </div>
            <div className="h-screen bg-gray bg-opacity-10 hidden md:flex">
                {shouldShowContent && <TMInfoSideBar />}
            </div>
          </div>
        </RootLayoutClient>
      </body>
    </html>
  );
};

export default RootLayout;
