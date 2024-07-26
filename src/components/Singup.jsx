import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from "../store/authSlice"
import { useDispatch } from 'react-redux'
import { Button, Input, Logo } from "./index"
import { useForm } from 'react-hook-form'

function Singup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const singUp = async (data) => {
        setError("")
        try {
            const userData = authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >Sign In</Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(singUp)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name"
                            type='text'
                            placeholder=" Enter your full name"
                            {...register("email", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^(?=.{1,254})(?=.{1,64}@.{1,255})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/.test(value) || "Email address must be a valid email address"
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: true,
                                // minLength: 8,
                                // validate: {
                                //     matchPatern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) || "Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters"
                                // }
                            })}
                        />
                        <Button type="submit" className="w-full">Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Singup
