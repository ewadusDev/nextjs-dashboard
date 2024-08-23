import Link from 'next/link'
import React from 'react'
Link
const SideNav = () => {
    return (
        <nav className='bg-white shadow-md p-10 rounded-lg'>
            <ul>
                <li className='cursor-pointer'><Link href={'/admin'} className='block my-3 p-3 rounded-lg shadow-lg'>Dashboard</Link></li>
                <li className='cursor-pointer'><Link href={'/admin/users'} className=' block my-3 p-3 rounded-lg shadow-lg'>Users</Link></li>
                <li className='cursor-pointer'><Link href={'/admin/posts'} className=' block my-3 p-3 rounded-lg shadow-lg cursor-pointer'>Posts</Link></li>
 
            </ul>
        </nav>
    )
}

export default SideNav