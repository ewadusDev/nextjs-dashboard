import React from 'react'
import AdminNav from '../components/AdminNav'
import Containers from '../components/Containers'
import Footer from '../components/Footer'
import SideNav from '../components/SideNav'
import Link from 'next/link'
import Image from 'next/image'


const AdminPostPage = () => {
  return ( 
    <Containers>
      <AdminNav />
      <div className='flex-grow'>
        <div className='flex mt-10'>
          <SideNav />
          <div className='p-10'>
            <h3 className='text-3xl mb-3'>Manage Posts</h3>
            <p>A list of posts retrived from MongoDB database</p>

            <div className=' shadow-lg overflow-x-auto'>
              <table className='text-left rounded-md my-3 table-fixed w-full'>
                <thead>
                  <tr className='bg-gray-400'>
                    <th className='p-5'>Post ID</th>
                    <th className='p-5'>Post Title</th>
                    <th className='p-5'>Post Image</th>
                    <th className='p-5'>Post Content</th>
                    <th className='p-5'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='p-5'>adds13141</td>
                    <td className='p-5'>This is post title</td>
                    <td className='p-5'><Image width={80} height={80} alt='Post image' className='my-3 rounded-md' src={'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nfGVufDB8fDB8fHww'}/></td>
                    <td className='p-5'>This is post content</td>
                    <td className='p-5'>
                      <Link href={"/admin/posts/edit"} className='bg-gray-500 text-white border py-2 px-3 rounded text-lg my-2'>Edit</Link>
                      <Link href={"/admin/posts/delete"} className='bg-red-500 text-white border py-2 px-3 rounded text-lg my-2'>Delete</Link>

                    </td>

                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Containers>
  )
}

export default AdminPostPage