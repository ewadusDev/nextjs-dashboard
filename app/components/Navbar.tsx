"use client"
import Link from 'next/link'
import React from 'react'
import { signOut } from 'next-auth/react'

const Navbar = ({ session }: { session: any }) => {
    return (
        <nav className='shadow-xl'>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center p-4'>
                    <div className='text-xl font-bold'>
                        <Link href={"/"}>
                            BOARD
                        </Link>
                    </div>
                    <ul className='flex'>

                        {!session ? (
                            <>
                                <li className='mx-3'> <Link href={"/login"}>Login</Link></li>
                                <li className='mx-3'> <Link href={"/register"}>Register</Link></li>
                            </>

                        ) : (
                            <li className='mx-3'>
                                <Link href={"/welcome"} className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Profile</Link>
                                <a onClick={() => signOut()} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Logout</a>
                            </li>
                        )}



                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default Navbar