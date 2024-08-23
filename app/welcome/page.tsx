import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import Container from '../components/Container'


const WelcomePage = () => {
    return (
        <Container>
            <Navbar />
            <div className='flex-grow'>
                <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <div className="flex justify-between">
                        <div>
                            <h3 className='text-3xl'>Profile</h3>
                            <p>Welcome, Ruknakub</p>
                        </div>
                        <div>
                            <Link href={"/create"} className='bg-green-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Create Post</Link>
                        </div>
                    </div>

                    {/* User Posts Data */}
                    <div>
                        <div className='shadow-xl my-10 p-10 rounded-xl'>
                            <h4 className='text-2xl'>Post Title</h4>
                            <Image
                                className='my-3 rounded-md'
                                src={"https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nfGVufDB8fDB8fHww"}
                                width={300} height={0} alt='Post Image' />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, dolorum cupiditate consectetur corporis laudantium quis! Optio quisquam mollitia, perspiciatis itaque ipsam aperiam consectetur illum. Fugiat explicabo corporis minima sequi vel.</p>
                            <div className="mt-5">
                                <Link href={"/edit"} className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Edit</Link>
                                <Link href={"/delete"} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Delete</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>

    )
}

export default WelcomePage