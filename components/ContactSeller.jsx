'use client'
import { postMessage } from '@/utils/actions'
import React, { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { toast } from 'react-toastify'

const ContactSeller = ({property}) => {
    const defaultData = {
        senderName: '',
        senderEmail: '',
        senderPhone: '',
        message: ''
    }
    const [formData, setFormData] = useState(defaultData)
    const handleSubmit = async (e) => {
        e.preventDefault()
        let resp = await postMessage(property, formData)
        if(resp.error){
            toast.error(resp.message)
        } else {
            toast.success("Your message has been sent to the property owner!!")
            setFormData(defaultData)
        }
    }
    const handleChange = (value,key) => {
        let updatedFormData = {...formData}
        updatedFormData[key] = value
        setFormData(updatedFormData);
    }
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
            <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='name'
                >
                Name:
                </label>
                <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='name'
                    type='text'
                    placeholder='Enter your name'             
                    required
                    onChange={(e) => handleChange(e.target.value, 'senderName')}
                    value={formData.senderName}
                />
            </div>
                <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                >
                    Email:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    onChange={(e) => handleChange(e.target.value, 'senderEmail')}
                    value={formData.senderEmail}
                />
                </div>
                <div className='mb-4'>
                <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='phone'
                >
                    Phone:
                </label>
                <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='phone'
                    type='text'
                    placeholder='Enter your phone number'
                    onChange={(e) => handleChange(e.target.value, 'senderPhone')}
                    value={formData.senderPhone}
                />
                </div>
                <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="message"
                >
                    Message:
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                    id="message"
                    placeholder="Enter your message"
                    onChange={(e) => handleChange(e.target.value, 'message')}
                    value={formData.message}
                ></textarea>
                </div>
                <div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                    type="submit"
                >
                    <FaPaperPlane className="mr-2" /> Send Message
                </button>
                </div>
            </form>
        </div>
    )
}

export default ContactSeller