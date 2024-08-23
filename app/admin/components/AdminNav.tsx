import Link from 'next/link'
import React from 'react'
import Logo from '@/public/next.svg'
import Image from 'next/image'

const AdminNav = () => {
    return (
        <nav className='shadow-xl'>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center p-4'>
                    <div>
                        <Link href={"/admin"}>
                            <Image src={Logo} alt='Logo' width={100} height={100} />
                        </Link>
                    </div>
                    <ul className='flex'>
                        <li className='mx-3'>
                            <Link href={"/login"}>Login</Link>
                        </li>
                        <li className='mx-3'>
                            <Link href={"/register "}>Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default AdminNav