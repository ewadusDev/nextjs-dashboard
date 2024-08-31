import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB()
        const totalUsers = await User.find()
        return NextResponse.json({ totalUsers }, { status: 200 })
    } catch (err) {
        console.error(err)
    }

}