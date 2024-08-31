import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

interface Params {
    id: string
}

export async function GET(req: Request, { params }: { params: Params }) {
    const { id } = params

    try {
        await connectMongoDB()
        const user = await User.findOne({ _id: id })
        return NextResponse.json({ user }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }

}

export async function PUT(req: Request, { params }: { params: Params }) {
    const { id } = params
    const { newName: name, newEmail: email, newPassword: password } = await req.json()

    const hashPassword = await bcrypt.hash(password, 10)

    try {
        await connectMongoDB()
        await User.findByIdAndUpdate(id, { name, email, password: hashPassword })
        return NextResponse.json({ message: "User Updated" }, { status: 200 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ Error: "Update user was failed" }, { status: 500 })

    }
}