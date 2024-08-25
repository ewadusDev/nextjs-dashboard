import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const user = { id: '1' }
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
    }
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST } // ระบบ Next auth จัดการทั้งฝัง GET POST ให้เอง