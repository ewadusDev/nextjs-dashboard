import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params

    try {
        await connectMongoDB()
        const data = await Post.findOne({ _id: id })
        return NextResponse.json({ data }, { status: 200 })

    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Error load data" }, { status: 200 })

    }

}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params
    const { newTitle: title, newImg: img, newContent: content } = await req.json()


    try {
        await connectMongoDB()
        await Post.findByIdAndUpdate(id, { title, img, content })
        return NextResponse.json({ message: "Post was updated" }, { status: 200 })

    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Updating is wrong" }, { status: 200 })

    }

}