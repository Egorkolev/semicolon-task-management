export const styles = {
    formWrapper: `
        flex 
        justify-center 
        gap-8 
        flex-wrap 
        items-center
    `,
    outsideForm: `
        hidden 
        md:block 
        space-y-8 
        flex-1 
        max-w-[397px]
        dark:bg-slate-600 
        dark:rounded-md 
        dark:shadow-blue 
        dark:shadow-lg
        p-3 
    `,
    frameForm: `
        mx-auto
        text-start
        w-[-webkit-fill-available]
        block 
        md:hidden 
        space-y-8
        max-w-[397px]
        bg-white bg-opacity-70
        dark:bg-slate-600
        dark:bg-opacity-70
        p-4
        rounded-lg
        shadow-xl
    `,
    toggleGroupItem: `
        flex flex-wrap h-fit 
        justify-center
        md:justify-between gap-2
        data-[state=on]:bg-white 
        bg-white w-full p-2 px-6
        rounded-2xl text-gray 
        data-[state=on]:text-blue
        border border-transparent 
        data-[state=on]:border-1 
        data-[state=on]:border-blue
        dark:bg-slate-600
        dark:data-[state=on]:text-gray
    `
}