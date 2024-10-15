"use client";
import React from "react";
import { SecondaryButton, YellowButton } from "../customComponents/TMButton";
import { TMFrame } from "../customComponents/TMFrame";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { FaGithub } from "react-icons/fa";
import { styles} from "@/styles/tailwindClasses";

const Layout = () => {
    return (
        <div className={styles.formWrapper}>
            <TMFrame childeren={
                <>
                    <Link className="text-infoBlue" href="/registration">
                        <SecondaryButton type="button" label="Create Account" />
                    </Link>
                    <h1 className="text-start text-6xl font-bold text-white hidden md:block ">Take your productivity to the next level.</h1>
                    <div className={styles.frameForm} >
                        <LoginForm />
                    </div>
                    <Link className="text-infoBlue" href="/registration">
                        <YellowButton type="button"><FaGithub className="mr-2" /> GitHub code review</YellowButton>
                    </Link>
                </>
            } />
            <div className={styles.outsideForm}>
                <LoginForm />
            </div>
        </div>
    );
};

export default Layout;