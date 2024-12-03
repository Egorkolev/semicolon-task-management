import OverviweFrame from "../public/overviewFrame.png";
import HelloImg from "../public/hello.png"
import Image from "next/image";
import { useTranslations } from "next-intl";

interface HeaderType {
    userName?: string | undefined;
    welcomeText?: string;
    textFrame?: string | React.JSX.Element;
    pageName?: string | React.ReactNode;
}

export const TMOverviewHeader = ({userName, welcomeText, textFrame, pageName}: HeaderType) => {
    const t = useTranslations('message');
    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-3 items-start">
                {userName && <Image src={HelloImg} alt="Hello" className="max-w-[100%] max-h-[100%] w-10 h-10 md:w-15 md:h-15" />}
                <div>
                    <h1 className="text-darkBlue dark:text-gray text-3xl font-bold">{pageName}</h1>
                    {userName && <h1 className="text-darkBlue dark:text-gray text-xl md:text-3xl font-bold">{t('hi', {userName: userName})}</h1>}
                    <p className="text-gray text-md">{welcomeText}</p>
                </div>
            </div>
            {textFrame && <div 
                className="
                    w-[100%] 
                    max-w-full p-8
                    text-white
                    rounded-2xl
                    font-serif
                    hidden
                    md:block
                    dark:shadow-blue 
                    dark:shadow-lg
                    "
                style={{
                    backgroundImage: `url(${OverviweFrame.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
                {textFrame}
            </div>}
        </div>

    )
}