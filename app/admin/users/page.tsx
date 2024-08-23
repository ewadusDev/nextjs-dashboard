import React from 'react'
import AdminNav from '../components/AdminNav'
import Containers from '../components/Containers'
import Footer from '../components/Footer'
import SideNav from '../components/SideNav'
import Link from 'next/link'

const page = () => {
  return (
    <Containers>
      <AdminNav />
      <div className='flex-grow'>
        <div className='flex mt-10'>
          <SideNav />
          <div className='p-10'>
            <h3 className='text-3xl mb-3'>Manage Users</h3>
            <p>A list of users retrived from MongoDB database</p>

            <div className=' shadow-lg overflow-x-auto'>
              <table className='text-left rounded-md my-3 table-fixed w-full'>
                <thead>
                  <tr className='bg-gray-400'>
                    <th className='p-5'>ID</th>
                    <th className='p-5'>Username</th>
                    <th className='p-5'>Email</th>
                    <th className='p-5'>Password</th>
                    <th className='p-5'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='p-5'>adds13141</td>
                    <td className='p-5'>Steve Roger</td>
                    <td className='p-5'>steve@gmail.com</td>
                    <td className='p-5'>123412313</td>
                    <td className='p-5'>
                      <Link href={"/admin/users/edit"} className='bg-gray-500 text-white border py-2 px-3 rounded text-lg my-2'>Edit</Link>
                      <Link href={"/admin/users/delete"} className='bg-red-500 text-white border py-2 px-3 rounded text-lg my-2'>Delete</Link>

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

export default page