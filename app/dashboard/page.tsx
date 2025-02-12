import React from 'react'
import { Dash } from '@/app/components/dash'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Dashboard - InvManager",
  description: "myApp Dashboard",
};

export default function DashboardPage() {
  return (
    <>
    <Dash />
    </>
  )
}
