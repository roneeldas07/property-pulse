'use client'
import { deleteMessage, readMessage } from '@/utils/actions'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useGlobalContext } from '@/context/GlobalContext'

const Message = ({info}) => {
    const {setUnreadMsgCount} = useGlobalContext()
    const [isRead, setIsRead] = useState(info.isRead)
    const [isDeleted, setIsDeleted] = useState(false)
    const router = useRouter()
    const handleRead = async (message) => {
        const resp = await readMessage(message)
        if(resp) {
            setIsRead(true)
            setUnreadMsgCount((prev)=> prev-1)
            toast.success("Message has been marked as read.")
        }
    }
    const handleDelete = async (message) => {
        const resp = await deleteMessage(message)
        if(resp) {
            if(message.isRead == false) setUnreadMsgCount((prev)=> prev-1)
            toast.success("Message has been deleted.")
            setIsDeleted(true)
        }
    }
    if(isDeleted) return null
    return (
            <div className="space-y-4">
            <div
                className="relative bg-white p-4 rounded-md shadow-md border border-gray-200"
            >
                <h2 className="text-xl mb-4">
                <span className="font-bold">Property Inquiry: </span>
                    {info.propertyName}
                </h2>
                <p className="text-gray-700">
                    {info.message}
                </p>

                <ul className="mt-4">
                <li><strong>Name:</strong> {info.senderName}</li>

                <li>
                    <strong>Reply Email: </strong>
                    <a href={`mailto:${info.senderEmail}`} className="text-blue-500">
                    {info.senderEmail}
                    </a>
                </li>
                <li>
                    <strong>Reply Phone: </strong>
                    <a href={`tel:${info.senderPhone}`} className="text-blue-500">
                        {info.senderPhone}
                    </a>
                </li>
                <li><strong>Received: </strong>{Date(info.createdAt)}</li>
                </ul>
                {!isRead && <button
                    className="mt-4 mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-md"
                    onClick={() => handleRead(info)}
                >
                    Mark As Read
                </button>}
                <button 
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-md"
                    onClick={() => handleDelete(info)}
                >
                    Delete
                </button>
            </div>
            </div>
    )
}

export default Message