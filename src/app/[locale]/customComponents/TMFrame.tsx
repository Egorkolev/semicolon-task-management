import Frame from "../public/frame.png"

interface FrameType {
    childeren?: React.ReactNode;
}

export const TMFrame: React.FC<FrameType> = ({childeren}) => {
    return (
        <div 
            className="flex-1 px-8 pt-8 pb-24 md:pb-8 rounded-[20px]" 
            style={{
                backgroundImage: `url(${Frame.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                maxWidth: '556px',
                height: 'calc(100vh - 80px)',
            }}>
                <div className="text-end flex flex-col justify-between gap-2 h-[-webkit-fill-available]">
                    {childeren}  
                </div>
        </div>
    )
}