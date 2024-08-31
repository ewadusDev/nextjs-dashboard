import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: Request, { params }: { params: { id: number } }) {
    const { id } = params
    try {
        await connectMongoDB()
        const post = await Post.findOne({ _id: id })
        return NextResponse.json({ post }, { status: 200 })
    } catch (err) {
        console.error(err)
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params
    const { newTitle: title, newImg: img, newConent: content } = await req.json()

    try {
        await connectMongoDB()
        await Post.findByIdAndUpdate(id, { title, img, content }) // find ด้วย ID
        return NextResponse.json({ message: "Post Updated" }, { status: 200 })
    } catch (err) {
        console.error(err)
    }

}