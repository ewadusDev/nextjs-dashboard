import Link from 'next/link'
import React from 'react'
import Logo from '@/public/next.svg'
import Image from 'next/image'

const Navbar = () => {
    return (
        <nav className='shadow-xl'>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center p-4'>
                    <div>
                        <Link href={"/"}>
                            <Image src={Logo} height={100} width={100} alt='NextJS Logo' />
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