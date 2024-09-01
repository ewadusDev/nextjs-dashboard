import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {

    try {
        await connectMongoDB()
        const totalPosts = await Post.find()
        return NextResponse.json({ totalPosts }, { status: 200 })
    } catch (err) {
        console.error(err)
    }

}

export async function DELETE(req: NextRequest) {

    const id = req.nextUrl.searchParams.get('id')
    try {
        await connectMongoDB()
        await Post.findByIdAndDelete(id)
        return NextResponse.json({ message: "User was Deleted" }, { status: 200 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "cannot delete user" }, { status: 500 })

    }


}