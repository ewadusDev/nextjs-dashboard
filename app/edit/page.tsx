import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import Container from '../components/Container'


const EditPage = () => {
    return (
        <Container>
            <Navbar />
            <div className='flex-grow'>
                <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <Link href={"/welcome"} className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl'>Edit Post</h3>
                    <form>
                        <input type="text" className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder='Post title' value={"ทดสอบ post"}/>
                        <input type="text" className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder='Post Img url' value={"https://images.unsplash.com/pho"}/>
                        <textarea cols={30} rows={10} className='w-[300px] block bg-gray-200 pt-2 px-3 text-lg rounded my-2' placeholder='Enter your post content'  value={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, magni."}/>
                        <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Edit Post</button>
                    </form>
                    
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default EditPage