"use client"
import React, { useEffect, useState } from 'react'
import AdminNav from './components/AdminNav'
import Container from './components/Containers'
import Footer from './components/Footer'
import SideNav from './components/SideNav'
import Content from './components/Content'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const AdminPage = () => {
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

    const [totalPost, setTotalPost] = useState([])
    const [totalUser, setTotalUser] = useState([])

    useEffect(() => {

        const getTotalPost = async () => {
            try {
                const resp = await fetch('/api/totalposts', {
                    method: "GET",
                    cache: 'no-store',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (!resp.ok) throw new Error("Failed to get total posts")

                const data = await resp.json()
                setTotalPost(data)

            } catch (err) {
                console.error(err)
            }
        }

        const getTotalUser = async () => {
            try {
                const resp = await fetch('/api/totalusers', {
                    method: "GET",
                    cache: 'no-store',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (!resp.ok) throw new Error("Failed to get total posts")

                const data = await resp.json()
                setTotalUser(data)

            } catch (err) {
                console.error(err)
            }
        }

        getTotalPost()
        getTotalUser()

    }, [])



    return (
        <Container>
            <AdminNav session={session} />
            <div className='flex-grow' >
                <div className='w-screen h-[calc(100vh-60px)] absolute' style={style} />
                <div className='container mx-auto relative z-30'>
                    <div className="flex justify-between mt-10 ">
                        <SideNav />
                        <Content totalPost={totalPost} totalUser={totalUser} />
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default AdminPage