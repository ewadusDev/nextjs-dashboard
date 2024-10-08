"use client"
import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav'
import Containers from '../components/Containers'
import Footer from '../components/Footer'
import SideNav from '../components/SideNav'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DeleteBtn from './DeleteBtn'


const ManageUserPage = () => {
  const style = {
    backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(5px)',
    opacity: '10%'
  } as React.CSSProperties;

  const { data: session }: { data: any } = useSession()
  if (!session) redirect('/login')
  if (session.user?.role !== "admin") redirect('/welcome')

  const [allUserData, setAllUserData] = useState<any | []>([])

  const getAllUserData = async () => {
    try {
      const resp = await fetch("/api/totalusers", {
        cache: 'no-store'
      })

      if (!resp.ok) throw new Error("Failed to fetch user")
      const data = await resp.json()
      setAllUserData(data)
    } catch (err) {
      console.error("Error loading users: ", err)
    }
  }

  useEffect(() => {
    getAllUserData()
  }, [])


  return (
    <Containers>
      <AdminNav session={session} />
      <div className='flex-grow'>
        <div className='w-screen h-[calc(100vh-60px)] absolute' style={style} />
        <div className='flex mt-10 relative z-30'>
          <SideNav />
          <div className='p-10'>
            <h3 className='text-3xl mb-3'>Manage Users</h3>
            <p>A list of users retrived from MongoDB database</p>

            <div className=' shadow-lg overflow-x-auto bg-white'>
              <table className='text-left rounded-md my-3 table-fixed w-full '>
                <thead>
                  <tr className='bg-gray-400'>
                    <th className='p-5'>ID</th>
                    <th className='p-5'>Username</th>
                    <th className='p-5'>Email</th>
                    <th className='p-5'>Role</th>
                    <th className='p-5'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allUserData?.totalUsers?.map((val: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td className='p-5'>{val._id}</td>
                          <td className='p-5'>{val.name}</td>
                          <td className='p-5'>{val.email}</td>
                          <td className='p-5'>{val.role}</td>
                          <td className='p-5'>
                            <Link href={`/admin/users/edit/${val._id}`} className='bg-gray-500 text-white border py-2 px-3 rounded text-lg my-2 shadow-lg'>Edit</Link>
                            <DeleteBtn id={val._id} />
                          </td>
                        </tr>
                      )
                    })
                  }

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

export default ManageUserPage