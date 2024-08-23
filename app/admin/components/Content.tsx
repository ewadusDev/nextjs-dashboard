import React from 'react'
import { FaUsers, FaRegNewspaper } from 'react-icons/fa6'

const Content = () => {
    return (
        <div className='px-10 rounded-lg'>
            <div className='flex'>
                <div className='bg-white shadow-lg w-[300px] m-3 p-10 rounded-lg'>
                    <h3 className='flex items-center'><FaUsers className='mr-2' />Total Users</h3>
                    <p className=' text-5xl mt-10'>29</p>
                </div>
                <div className='bg-white shadow-lg w-[300px] m-3 p-10 rounded-lg'>
                    <h3 className='flex items-center'><FaRegNewspaper className='mr-2' />Total Posts</h3>
                    <p className=' text-5xl mt-10'>59</p>
                </div>
            </div>

            <p className='bg-white shadow-lg m-3 p-10'> <span className='text-xl font-bold'>Welcome to the Admin Dashboard! Here, you can efficiently manage all user accounts and posts.</span> <br />
                Manage User Accounts: Create, update, or deactivate user accounts. Ensure each user has the appropriate access level and monitor account activity for security. <br />
                Moderate Posts: Review and manage user-generated content. Edit, approve, or delete posts as needed to maintain community guidelines and content quality.


            </p>
        </div>
    )
}

export default Content