'use client'
import { useState, FormEvent, } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'

const RegisterPage = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [cfPassword, setCFPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [sucess, setSeuccess] = useState<string>("")

    const hanndleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!name || !email || !password || !cfPassword) {
            setError('กรุณากรอกข้อมูลให้ครบถ้วน')
            setTimeout(() => {
                setError('')
            }, 3000);
            return
        }

        if (password !== cfPassword) {
            setError('Password ไม่ตรงกัน')
            setTimeout(() => {
                setError('')
            }, 3000);
            return
        }



        try {

            // Check Exist User first
            const respExistUser = await fetch('/api/userExist', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })

            const { user } = await respExistUser.json()

            if (user) {
                setError('Already had account')
                setTimeout(() => {
                    setError('')
                }, 3000);
                return
            }

            // If does not exist then register
            const response = await fetch('/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })
            if (response.ok) {
                setName("");
                setEmail("");
                setPassword("");
                setCFPassword("");
                setError("");
                setSeuccess("Register sucessfully")
                setTimeout(() => {
                    setSeuccess('')
                }, 3000);
            } else {
                console.log("User registration failed")
            }
        } catch (err) {
            console.error("Error", err)
        }
    }

    return (
        <Container>
            <Navbar />
            <div className='flex-grow'>
                <div className='flex justify-center items-center'>
                    <div className='w-[400px] shadow-xl p-10 mt-5 rounded-xl'>
                        <h3 className='text-3xl'>Register</h3>
                        <hr className='my-3' />
                        <form onSubmit={hanndleSubmit}>
                            <input type="text" className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter your name' onChange={(e) => setName(e.target.value)} value={name} />
                            <input type="email" className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} />
                            <input type="password" className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} value={password} />
                            <input type="password" className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter your confirm password' onChange={(e) => setCFPassword(e.target.value)} value={cfPassword} />

                            {error && (
                                <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md my-2'>
                                    {error}
                                </div>
                            )}

                            {sucess && (
                                <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md my-2'>
                                    {sucess}
                                </div>
                            )}

                            <button className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Sign up</button>
                            <hr className='my-3' />
                            <p>
                                Already have an account? Go to <Link href={"/login"} className='text-blue-500 hover:underline'>Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default RegisterPage