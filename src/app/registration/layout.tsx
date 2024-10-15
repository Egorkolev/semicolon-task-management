"use client";
import React from "react";
import { SecondaryButton, YellowButton } from "../customComponents/TMButton";
import { TMFrame } from "../customComponents/TMFrame";
import Link from "next/link";
import RegistrationForm from "./RegistrationFotm";
import { styles } from "@/styles/tailwindClasses";
import { FaGithub } from "react-icons/fa";

const Layout = () => {
    return (
        <div className={styles.formWrapper}>
            <TMFrame childeren={
                <>
                    <Link href="/login">
                        <SecondaryButton type="button" label="Log In" />
                    </Link> 
                    <h1 className="text-start text-6xl font-bold text-white hidden md:block ">Take your productivity to the next level.</h1>
                    <div className={styles.frameForm} >
                        <RegistrationForm />
                    </div>
                    <Link className="text-infoBlue" href="/registration">
                        <YellowButton type="button"><FaGithub className="mr-2" /> GitHub code review</YellowButton>
                    </Link>
                </>

            } />
            <div className={styles.outsideForm}>
                <RegistrationForm />
            </div>
        </div>
    );
};

export default Layout;