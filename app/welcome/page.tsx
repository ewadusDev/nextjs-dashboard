"use client"
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import Container from '../components/Container'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface Getpost {
    _id: string
    title: string
    img: string
    content: string
    userEmail: string
}

interface Posts {
    posts: Getpost[]
}

const WelcomePage = () => {
    const { data: session } = useSession()
    if (!session) redirect('/login')
    const [posts, setPosts] = useState<Posts | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const currentUserEmail = session.user?.email


    useEffect(() => {

        const getPost = async () => {
            setLoading(true)
            try {
                const resp = await fetch(`/api/posts?email=${currentUserEmail}`, {
                    cache: 'no-store'
                })

                if (!resp.ok) {
                    setError("Error")
                    throw new Error("Failed to fetch posts")
                }

                const data = await resp.json()
                setPosts(data)

            } catch (err) {
                console.error(err)
                setError("Error")
            }
            setLoading(false)
        }

        getPost()

    }, [currentUserEmail])
    return (
        <Container>
            <Navbar session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <div className="flex justify-between">
                        <div>
                            <h3 className='text-3xl'>Profile</h3>
                            <p>Welcome, {session?.user?.name}</p>
                            <p>Email, {session?.user?.email}</p>
                        </div>
                        <div>
                            <Link href={"/create"} className='bg-green-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Create Post</Link>
                        </div>
                    </div>

                    {/* User Posts Data */}
                    {loading ? (
                        <p>loading.....</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <>
                            {posts?.posts.map((val, index) => {
                                return (
                                    <div key={index}>
                                        <div className='shadow-xl my-10 p-10 rounded-xl'>
                                            <h4 className='text-2xl'>{val.title}</h4>
                                            <Image
                                                className='my-3 rounded-md'
                                                src={val.img}
                                                width={300} height={0} alt='Post Image' />
                                            <p>{val.content}</p>
                                            <div className="mt-5">
                                                <Link href={`/edit/${val._id}`} className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Edit</Link>
                                                <Link href={`/delete/${val._id}`} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Delete</Link>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    )}


                </div>
            </div >
            <Footer />
        </Container >

    )
}

export default WelcomePage