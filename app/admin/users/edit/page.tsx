import React from 'react'
import AdminNav from '../../components/AdminNav'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Containers from '../../components/Containers'


const EditPage = () => {
    return (
        <Containers>
            <AdminNav />
            <div className='flex-grow'>
                <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <Link href={"/admin/users"} className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl'>Admin Edit User Post</h3>
                    <form>
                        <input type="text" className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder='Username'  />
                        <input type="text" className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder='Email'  />
                        <input type="text" className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder='Password'  />
                        <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Update User</button>
                    </form>
                </div>
            </div>
            <Footer />
        </Containers>
    )
}

export default EditPage