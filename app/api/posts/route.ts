import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse, NextRequest } from "next/server";

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

export async function GET(req: NextRequest) {
    const userEmail = req.nextUrl.searchParams.get("email")  // หน้าบ้าน ยิงขอผ่าน /api/posts?email=ruk@gmail.com  ?email คือที่มันดักจาก req.nextUrl.searchParams.get
    await connectMongoDB()
    const posts = await Post.find({ userEmail: userEmail })
    return NextResponse.json({ posts })

}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id")

    try {
        await connectMongoDB()
        await Post.findByIdAndDelete(id)
        return NextResponse.json({ message: "Post was deleted" }, { status: 200 })

    } catch (err) {
        console.error(err)
    }

}