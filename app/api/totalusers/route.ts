import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    try {
        await connectMongoDB()
        const totalUsers = await User.find()
        return NextResponse.json({ totalUsers }, { status: 200 })
    } catch (err) {
        console.error(err)
    }

}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id")

    try {
        await connectMongoDB()
        await User.findByIdAndDelete(id)
        return NextResponse.json({ message:"User was Deleted" }, { status: 200 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error:"cannot delete user"}, { status: 500 })

    }

}