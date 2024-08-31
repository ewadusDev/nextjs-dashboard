'use client'
import { useState, FormEvent, use } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import Container from '../components/Container'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

const CreatePage = () => {
    const router = useRouter()
    const { data: session } = useSession()
    if (!session) redirect("/login")


    const [title, setTitle] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [content, setContent] = useState<string>("")

    const currentUserEmail = session.user?.email

    const handleSumbitForm = async (event: FormEvent) => {
        event.preventDefault()

        try {
            const resp = await fetch('/api/posts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, img: image, content, userEmail: currentUserEmail })
            })

            if (resp.ok) {
                router.push('/welcome')
            } else {
                alert("Failed while create a post")
                throw new Error("Failed to create a post")
            }

        } catch (err) {
            console.error("something was wrong while submitting form", err)
        }
    }

    return (
        <Container>
            <Navbar session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <Link href={"/welcome"} className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl'>Create Post</h3>
                    <form onSubmit={handleSumbitForm}>
                        <input type="text" className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder='Post title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="text" className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder='Post Img url' value={image} onChange={(e) => setImage(e.target.value)} />
                        <textarea cols={30} rows={10} className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder='Enter your post content' value={content} onChange={(e) => setContent(e.target.value)} />
                        <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Create Post</button>
                    </form>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default CreatePage