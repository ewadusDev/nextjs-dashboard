import Link from 'next/link'
import React from 'react'
Link
const SideNav = () => {
    return (
        <nav className=' shadow-md p-10 rounded-lg'>
            <ul>
                <li><Link href={'/admin'} className=' block my-3 p-3 rounded-lg'>Dashboard</Link></li>
                <li><Link href={'/admin/users'} className=' block my-3 p-3 rounded-lg'>Users</Link></li>
                <li><Link href={'/admin/posts'} className=' block my-3 p-3 rounded-lg'>Posts</Link></li>
 
            </ul>
        </nav>
    )
}

export default SideNav