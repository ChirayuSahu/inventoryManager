'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import {auth} from '@/app/firebase/config'
import {User, onAuthStateChanged, signOut } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const Navbar = () => {

    const [user,setUser]=useState<User | null>(null);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    },[])

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const router = useRouter();
    
    const handleLogout = async () => {
        try{
            await signOut(auth);
            router.push("/sign-in");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <header className="flex items-center justify-between py-4 md:py-8">
                    <Link href="/" className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl" aria-label="logo">
                        <svg width="95" height="94" viewBox="0 0 95 94" className="h-auto w-6 text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M96 0V47L48 94H0V47L48 0H96Z" />
                        </svg>
                        InvManager
                    </Link>

                    <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
                        {user ? (
                            <button onClick={handleLogout} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                            Log Out
                        </button>
                        ):(
                            <Link href="/" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                                Home
                            </Link>
                        )}
                        {user ? (
                            <Link href="/dashboard" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                                Dashboard
                            </Link>
                        ) : (
                            <Link href="/sign-in" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                                Sign Up
                            </Link>
                        )}
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
                        onClick={toggleMenu} // Add toggle functionality
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        Menu
                    </button>
                </header>

                {isMenuOpen && (
                    <div className="lg:hidden">
                        <nav className="flex flex-col gap-4 py-4">
                            <Link href="/" className="text-lg font-semibold text-gray-600 hover:text-indigo-500">Home</Link>
                            {user ? (
                                <Link href="/dashboard" className="text-lg font-semibold text-gray-600 hover:text-indigo-500">Dashboard</Link>
                            ) : (
                                <Link href="/sign-in" className="text-lg font-semibold text-gray-600 hover:text-indigo-500">Sign Up</Link>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </div>
    )
}
