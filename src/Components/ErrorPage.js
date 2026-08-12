"use client";
import React from 'react'
import Link from 'next/link'

const ErrorPage = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center py-20 gap-8 bg-black text-white'>
        <h1 className='text-3xl font-bold'>Something went wrong❗</h1>
        <Link href="/browse" className='bg-purple-600 text-xl px-4 py-2 rounded-lg font-semibold'>Go to home</Link>
    </div>
  )
}

export default ErrorPage
