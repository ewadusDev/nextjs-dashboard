import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        await connectMongoDB()
        const totalPosts = await Post.find()
        return NextResponse.json({ totalPosts }, { status: 200 })
    } catch (err) {
        console.error(err)
    }

}