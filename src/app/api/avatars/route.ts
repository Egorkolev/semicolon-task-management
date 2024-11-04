import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { apiKeys } from "@/lib/apiKeys";

const supabase = createClient(apiKeys.SUPABASE_URL!, apiKeys.SUPABASE_ROLE_KEY!);

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get('file')
    console.log("file", file);
    
    const userId = req.headers.get('tm-user-id');
    
    if(!userId || !file) {
        return NextResponse.json({warning: "Missing file or userId"}, {status: 400});
    }

    if(!(file instanceof File)) {
        return NextResponse.json({error: "File must be an image"}, {status: 400});
    }

    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    if(file.size > MAX_FILE_SIZE) {
        return NextResponse.json({error: "File size must be less than 2MB"}, {status: 400});
    }
    try {
        const filePath = `avatars/${userId}-${Date.now()}`;
        const {error} = await supabase.storage.from("avatars").upload(filePath, file, {upsert: true});

        if(error) {
            throw error;
        }
        const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
        const publicURL = data?.publicUrl;
        await prisma.user.update({
            where: {id: userId},
            data: {photoUrl: publicURL}
        })

    return NextResponse.json({message: "Your profile Image successfully uploaded"}, {status: 200});
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({error: "An error occurred. Please try again later"}, {status: 500});
    }
}