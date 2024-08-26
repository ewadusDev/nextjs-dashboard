import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { title, img, content, userEmail } = await req.json()
    try {
        await connectMongoDB()
        await Post.create({ title: title, img: img, content: content, userEmail })
        return NextResponse.json({ message: "Post created" }, { status: 201 })

    } catch (err) {
        return NextResponse.json({ message: `Post is interupted: ${err}` }, { status: 500 })
    }
}