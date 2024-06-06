'use client'
import { bookmarkAction, getBookmarkedData } from '@/utils/actions'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaBookmark } from 'react-icons/fa'
import { toast } from 'react-toastify'

const PropertyBookmarkButton = ({property}) => {
    const [isBookmarked,setIsBookmarked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const {data: session} = useSession()
    const userId = session?.user?.id
    useEffect(()=>{
        getBookmarkData()
    },[userId])

    const getBookmarkData = async () => {
        if(!userId) return
        try {
            let resp = await getBookmarkedData(property._id)
            setIsBookmarked(resp?.isBookmarked)
        } catch (error) {
            console.error(error)
            toast.error("Failed to get bookmark info")
        } finally {
            setIsLoading(false)
        }
    }

    const handleBookmark = async () => {
        try {
            await bookmarkAction(property._id, isBookmarked)
            await getBookmarkData()
        } catch (error) {
            console.error(error)
            toast.error("Failed to set bookmark info")
        }
    }

    if(!session?.user?.id) return  null

    return (
        <>
            {isLoading ? <p>Loading...</p> :
                <button 
                    className={`${isBookmarked ? "bg-red-500 hover:bg-red-600" 
                        : "bg-blue-500 hover:bg-blue-600"} 
                        text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
                    onClick={()=> handleBookmark()}
                >
                    <FaBookmark className="mr-2"/> {isBookmarked ? "Remove Bookmark" : "Bookmark Property"}
                </button>
            }
        </>
    )
}

export default PropertyBookmarkButton