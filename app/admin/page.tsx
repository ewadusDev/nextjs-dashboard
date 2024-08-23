import React from 'react'
import AdminNav from './components/AdminNav'
import Container from './components/Containers'
import Footer from './components/Footer'
import SideNav from './components/SideNav'
import Content from './components/Content'



const AdminPage = () => {
    const style = {
        backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(5px)',
        opacity: '10%'
    } as React.CSSProperties;


    return (
        <Container>
            <AdminNav />
            <div className='flex-grow' >
            <div className='w-screen h-[calc(100vh-60px)] absolute' style={style}/>
                <div className='container mx-auto relative z-30'>
                    <div className="flex justify-between mt-10 ">
                        <SideNav />
                        <Content />
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default AdminPage