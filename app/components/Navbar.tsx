import Link from 'next/link'
import React from 'react'
const Navbar = () => {
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
                        <li className='mx-3'> <Link href={"/login"}>Login</Link></li>
                        <li className='mx-3'> <Link href={"/register"}>Register</Link></li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default Navbar