"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GiTeamIdea } from "react-icons/gi";
import { GiDesk } from "react-icons/gi";
import { FaCaretRight } from "react-icons/fa6";
import { TMOverviewHeader } from "@/app/customComponents/TMOverviewHeader";
import { GhostButton } from "@/app/customComponents/TMButton";
import { styles } from "@/styles/tailwindClasses";

const Layout = () => {
    return (
        <div className="flex flex-col gap-5">
            <TMOverviewHeader 
                welcomeText="Wecome to Semicolon Task Management" 
                textFrame="Motivation to help you work." 
                userName="Egor" 
            />
            <ToggleGroup className="flex flex-col gap-2" type="single" defaultValue="a">
                <ToggleGroupItem className={styles.toggleGroupItem} value="a">
                    <GiTeamIdea className="text-blue bg-gray bg-opacity-10 w-8 h-8 p-1 rounded-md" />
                    <h3>Hey Egor, Update your Profile Picture</h3>
                    <GhostButton className="hover:text-blue hover:bg-blue hover:bg-opacity-5">Get Started <FaCaretRight /></GhostButton>
                </ToggleGroupItem>
                <ToggleGroupItem className={styles.toggleGroupItem}  value="b">
                    <GiDesk className="text-blue bg-gray bg-opacity-10 w-8 h-8 p-1 rounded-md" />
                    <h3>Create your First Task in your Workspace</h3>
                    <GhostButton className="hover:text-blue hover:bg-blue hover:bg-opacity-5">Get Started <FaCaretRight /></GhostButton>
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
};

export default Layout;