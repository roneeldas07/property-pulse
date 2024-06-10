'use client'
import Message from '@/components/Message'
import Spinner from '@/components/Spinner'
import { fetchMessages } from '@/utils/actions'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const MessagePage = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchMessagesFn = async () => {
        try {
           setLoading(true) 
           let resp = await fetchMessages() || []
           console.log(resp)
           setMessages(resp)
        } catch (error) {
            console.error(error)
            toast.error("Failed to retrieve messages")
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchMessagesFn()
    },[])

    return (
    <>
        {loading ? <Spinner loading={loading}/> :
            <section className="bg-blue-50 p-4">
                <div
                    className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                >
                    <h1 className="text-2xl font-bold mb-4">Your Messages</h1>
                    <div className='flex flex-col gap-4'>
                        { messages.length ? messages.map((message) => <Message info={message} key={message._id}/>) :  <p>No messages</p> }
                    </div>
                </div>
            </section>
        }
    </>
        
    )
}

export default MessagePage