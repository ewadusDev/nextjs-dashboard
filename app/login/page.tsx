"use client"
import { useState, FormEvent } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { data: session } = useSession()
    const router = useRouter()

    if(session) router.replace("welcome")

    const handeSubmit = async (event: FormEvent) => {
        event.preventDefault()

        try {
            const resp = await signIn("credentials", {
                email, password, redirect: false
            })

            if (resp?.error) {
                setError("Invalid Credentials")
                return
            }
            router.replace("welcome")

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Container>
            <Navbar  session={session}/>
            <div className='flex-grow'>
                <div className='flex justify-center items-center'>
                    <div className='w-[400px] shadow-xl p-10 mt-5 rounded-xl'>
                        <h3 className='text-3xl'>Login</h3>
                        <hr className='my-3' />
                        <form onSubmit={handeSubmit}>
                            <input type="email" className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} />
                            <input type="password" className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} value={password} />

                            {error && (
                                <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md my-2'>
                                    {error}
                                </div>
                            )}
                            <button className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Sign In</button>
                            <hr className='my-3' />
                            <p>
                                Do not have an account? Go to <Link href={"/register"} className='text-blue-500 hover:underline'>Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default LoginPage