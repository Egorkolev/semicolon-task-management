import type { Metadata } from "next";
import { UserProvider } from "../../context/UserContext";
import { DateProvider } from "@/context/DateContext";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
  };

const RootLayoutClient = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <DateProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </DateProvider>
    )
}

export default RootLayoutClient;