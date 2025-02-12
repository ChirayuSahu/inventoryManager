import React from 'react'
import { SignIn } from '@/app/components/sign-in'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Sign In - InvManager",
  description: "myApp Dashboard",
};

export default function DashboardPage() {
  return (
    <>
    <SignIn />
    </>
  )
}
