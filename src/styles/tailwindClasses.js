export const styles = {
    formWrapper: `
        flex
        justify-center 
        gap-8
        flex-wrap 
        items-center
        relative
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    `,
    outsideForm: `
        w-[90%]
        z-index-10
        absolute
        md:static
        space-y-8 
        flex-1 
        max-w-[397px]
        bg-white
        bg-opacity-80
        md:bg-opacity-0
        dark:bg-neutral-800 
        md:dark:bg-neutral-800 
        dark:bg-opacity-80
        rounded-md
        dark:rounded-sm
    `,
    frameForm: `
        mx-auto
        text-start
        w-[-webkit-fill-available]
        block 
        space-y-8
        max-w-[397px]
        bg-white bg-opacity-70
        dark:bg-neutral-700
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
        dark:bg-neutral-700
        dark:data-[state=on]:text-gray
    `,
    settingsGroupItem: `
        flex flex-wrap h-fit gap-4
        bg-white w-full p-2 px-6
        rounded-2xl 
        dark:bg-neutral-700 border
        dark:text-gray
        border-gray items-center
    `
}