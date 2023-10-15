"use client"
import { signIn, signOut } from "next-auth/react"
import Link from "next/link"

export const LoginButton = () =>{
    return (
        <button className='btn btn-primary w-auto' onClick={() => signIn()}>
            Login
        </button>
    )
}

export const LogoutButton = () =>{
    return (
        <button className='btn btn-danger w-auto' onClick={() => signOut()}>
            Logout
        </button>
    )
}