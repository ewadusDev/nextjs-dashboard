import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs'



const authOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password }: any = credentials

                await connectMongoDB()
                const user = await User.findOne({ email })

                if (!user) {
                    return null
                }

                const passwordMatch = await bcrypt.compare(password, user.password)

                if (!passwordMatch) {
                    return null

                }
                console.log("authorize BE", user)
                return user
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"    // หน้าที่ auth อยากรู้ว่า login หน้าไหน
    },
    callbacks: {
        async jwt({ token, user, session }: any) { // ข้อมูลจากหลังบ้าน เพื่อส่งให้ session ไปหน้าบ้าน
            console.log("jwt BE token", token)
            console.log("jwt BE user", user)

            if (user) {
                return {
                    ...token,
                    id: user.id,
                    role: user.role
                }
            }

            return token;
        },
        async session({ session, user, token }) {  // ส่งไปให้หน้าบ้านใช้
            console.log("session BE session", session)
            console.log("session BE token", token)
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                    data4front: "session เพื่อหน้าบ้าน"
                }
            }
        }

    }

}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST } // ระบบ Next auth จัดการทั้งฝัง GET POST ให้เอง