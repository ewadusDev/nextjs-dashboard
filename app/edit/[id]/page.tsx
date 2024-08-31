"use client"
import { useState, useEffect, FormEvent } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Container from '../../components/Container'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface Post {
    post: PostData
}
interface PostData {
    content: string
    img: string
    title: string
}

const EditPage = ({ params }: { params: { id: string } }) => {
    const { data: session } = useSession()
    if (!session) redirect('/login')
    // usestate for get from api
    const [postData, setPostData] = useState<null | Post>(null)
    // usestate for input
    const [title, setTitle] = useState<string>('')
    const [img, setImg] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const router = useRouter()

    useEffect(() => {
        const getPostById = async (id: string) => {
            try {
                const resp = await fetch(`/api/posts/${id}`, {
                    method: "GET",
                    cache: "no-store"
                })
                if (!resp.ok) {
                    throw new Error("Failed to fetch post")
                }
                const data = await resp.json()
                setPostData(data)
            } catch (err) {
                console.error(err)
            }
        }
        getPostById(params.id)
    }, [params.id])

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const resp = await fetch(`/api/posts/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newTitle: title,
                    newImg: img,
                    newConent: content
                })
            })

            if (!resp.ok) {
                throw new Error("Failed to update post")
            }
            router.refresh()
            router.push('/welcome')
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <Container>
            <Navbar session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <Link href={"/welcome"} className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl'>Edit Post</h3>
                    <form onSubmit={handleSubmit}>
                        <input onChange={(e) => setTitle(e.target.value)} type="text" className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder={postData?.post?.title} value={title} />
                        <input onChange={(e) => setImg(e.target.value)} type="text" className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder={postData?.post?.img} value={img} />
                        <textarea onChange={(e) => setContent(e.target.value)} cols={30} rows={10} className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder={postData?.post?.content} value={content} />
                        <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Edit Post</button>
                    </form>

                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default EditPage