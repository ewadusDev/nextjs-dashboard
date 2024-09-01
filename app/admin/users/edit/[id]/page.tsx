"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import AdminNav from '../../../components/AdminNav'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import Containers from '../../../components/Containers'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'


const AdminEditUserPage = ({ params }: { params: { id: string } }) => {
    const { data: session } = useSession()
    const router = useRouter()
    if (!session) redirect('/login')
    if (session.user?.role !== "admin") redirect('/welcome')

    const { id } = params
    // old user
    const [userOldData, setUserOldData] = useState(null)
    // new user data
    const [newName, setNewName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const getUserById = async (id: string) => {
        try {
            const resp = await fetch(`/api/totalusers/${id}`)

            if (!resp.ok) throw new Error('Failed to fetch users')

            const data = await resp.json()

            setUserOldData(data)

        } catch (err) {
            console.error(err)
        }

    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {

            const resp = await fetch(`/api/totalusers/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newName, newEmail, newPassword })
            })

            if (!resp.ok) throw new Error("Failed tp update user")

            router.refresh()
            router.push('/admin/users')

        } catch (err) {
            console.error(err)
        }

    }

    useEffect(() => {
        getUserById(id)
    }, [id])



    return (
        <Containers>
            <AdminNav session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <Link href={"/admin/users"} className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl'>Admin Edit User</h3>
                    <form onSubmit={handleSubmit}>
                        <input onChange={(e) => setNewName(e.target.value)} value={newName} type="text" className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder={userOldData?.user.name} />
                        <input onChange={(e) => setNewEmail(e.target.value)} value={newEmail} type="text" className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder={userOldData?.user.email} />
                        <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type="password" className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder={userOldData?.user.password} />
                        <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Update User</button>
                    </form>
                </div>
            </div>
            <Footer />
        </Containers>
    )
}

export default AdminEditUserPage