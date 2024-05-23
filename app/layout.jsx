import React from 'react'
import '@/assets/styles/globals.css'

export const metadata = {
    title: "Property Pulse",
    description: "Property Pulse is a real estate platform that allows users to search for properties, create listings, and connect with other users."
}

const MainLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <div>{children}</div>
        </body>
    </html>
  )
}

export default MainLayout