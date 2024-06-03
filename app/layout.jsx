import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    title: "Property Pulse",
    description: "Property Pulse is a real estate platform that allows users to search for properties, create listings, and connect with other users."
}

const MainLayout = ({children}) => {
  return (
    <AuthProvider>
      <html className='h-full' lang='en'>
          <body className='flex flex-col h-full w-full'>
              <Navbar/>
              <main className='grow'>{children}</main>
              <Footer/>
              <ToastContainer/>
          </body>
      </html>
    </AuthProvider>
  )
}

export default MainLayout