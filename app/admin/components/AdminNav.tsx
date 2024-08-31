import Link from 'next/link'
import React from 'react'
import { signOut } from 'next-auth/react'

interface User {
    data4front?: string
    email: string
    id: string
    name: string
    role?: string
}
interface Session {
    user: User
    expires: string

}

const AdminNav = ({ session }: any) => {
    return (
        <nav className='shadow-xl h-[60px]'>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center p-4'>
                    <div className='text-xl font-bold'>
                        <Link href={"/admin"}>
                            ADMIN BOARD
                        </Link>
                    </div>
                    <ul className='flex'>
                        {session ? (
                            <li className='mx-3'>
                                <a onClick={() => signOut()} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2 cursor-pointer'>Logout</a>
                            </li>
                        ) : (
                            <>
                                <Link href={"/login"}>Login</Link>
                                <Link href={"/register"}>Register</Link>
                            </>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default AdminNav