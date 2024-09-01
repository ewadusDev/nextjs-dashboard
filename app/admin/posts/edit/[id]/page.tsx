"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import AdminNav from '../../../components/AdminNav'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import Containers from '../../../components/Containers'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'


const AdminEditPage = ({ params }: { params: { id: string } }) => {
    const { id } = params
    const { data: session } = useSession()
    const router = useRouter()

    if (!session) redirect('/login')
    if (session.user?.role !== 'admin') redirect('/welcome')
    // usestate old data
    const [postedData, setPostedData] = useState(null)
    // usestate new data
    const [newTitle, setNewTitle] = useState("")
    const [newImg, setNewImg] = useState("")
    const [newContent, setNewContent] = useState("")

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const resp = await fetch(`/api/totalposts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newTitle, newImg, newContent })
            })

            if (!resp.ok) throw new Error('Failed to sumit form')
            router.refresh()
            router.push('/admin/posts')
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(`/api/posts/${id}`, {
                    method: 'GET',
                    cache: 'no-store'
                })

                if (!resp.ok) throw new Error("")
                const data = await resp.json()

                setPostedData(data)

            } catch (err) {
                console.error(err)
            }
        }

        fetchData()

    }, [])



    return (
        <Containers>
            <AdminNav session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <Link href={"/admin/posts"} className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl'>Admin Edit User Post</h3>
                    <form onSubmit={handleSubmit}>
                        <input onChange={(e) => setNewTitle(e.target.value)} value={newTitle} type="text" className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder={postedData?.post?.title} />
                        <input onChange={(e) => setNewImg(e.target.value)} value={newImg} type="text" className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder={postedData?.post?.img} />
                        <textarea onChange={(e) => setNewContent(e.target.value)} value={newContent} cols={30} rows={10} className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder={postedData?.post?.content} />
                        <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Update Post</button>
                    </form>
                </div>
            </div>
            <Footer />
        </Containers>
    )
}

export default AdminEditPage