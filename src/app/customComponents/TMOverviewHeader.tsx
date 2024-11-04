import OverviweFrame from "../public/overviewFrame.png";
import HelloImg from "../public/hello.png"
import Image from "next/image";

interface HeaderType {
    userName: string | undefined;
    welcomeText: string;
    textFrame: string | React.JSX.Element;
}

export const TMOverviewHeader = ({userName, welcomeText, textFrame}: HeaderType) => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-3 items-start">
                <Image src={HelloImg} alt="Hello" className="max-w-[100%] max-h-[100%] w-15 h-15" />
                <div>
                    <h1 className="text-darkBlue text-3xl font-bold">Hi {userName},</h1>
                    <p className="text-gray text-md">{welcomeText}</p>
                </div>
            </div>
            <div 
                className="
                    w-[100%] 
                    max-w-full p-8
                    text-white
                    rounded-2xl
                    font-serif
                    "
                style={{
                    backgroundImage: `url(${OverviweFrame.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
                {textFrame}
            </div>
        </div>

    )
}