'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import profile_pic from '@/assets/images/profile.png'
import { useSession } from 'next-auth/react';
import { fetchUserProperties } from '@/utils/actions'
import Spinner from '@/components/Spinner'
import PropertyList from '@/components/PropertyList'

const Profile = () => {
    const {data: session} = useSession()
    const profileImage = session?.user?.image || profile_pic
    const [properties,setProperties] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const fetchUserPropertiesFn = async (userId) => {
            try {
                let fetchedProperty = await fetchUserProperties(userId)
                setProperties(fetchedProperty)
            } catch (error) {
                console.error("Error in fetching record", error)
            } finally {
                setLoading(false)
            }
        }
        if(session?.user?.id) fetchUserPropertiesFn(session.user.id)
    }, [session])
    return (
        <>
            {loading ? <Spinner loading={loading}/> : 
                <section className="bg-blue-50">
                    <div className="container m-auto p-10">
                        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 mx-20 mt-10">
                            <div className="mb-4">
                                <Image
                                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                                    src={profileImage}
                                    alt="User"
                                    height={0}
                                    width={0}
                                    sizes='100vw'
                                />
                            </div>
                            <h2 className="text-2xl mb-4"><span className="font-bold block">Name: </span>{session?.user?.name}</h2>
                            <h2 className="text-2xl"><span className="font-bold block">Email: </span>{session?.user?.email}</h2>
                            </div>
    
                            <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                                {properties.map(property => <PropertyList property={property}/>)}
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            }
        </>
        
    )
}

export default Profile