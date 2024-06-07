'use client'
import PropertyCard from '@/components/PropertyCard'
import SearchBar from '@/components/SearchBar'
import Spinner from '@/components/Spinner'
import { searchProperties } from '@/utils/actions'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { toast } from 'react-toastify'

const SearchResults = () => {
    const searchParams = useSearchParams()
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const location = searchParams.get('location')
    const type = searchParams.get('type')
    const searchPropertiesFn = async (location, type) => {
        try {
            const resp = await searchProperties(location, type)
            setProperties(resp)
        } catch (error) {
            console.error(error)
            toast.error("Failed to fetch matching properties")
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=>{
        searchPropertiesFn(location,type)
    },[location,type])
    return (
        <>
            {loading ? <Spinner loading={loading} /> : 
            <>
                <section className="bg-blue-700 py-3 mb-4">
                    <SearchBar/>
                </section>
                <section className="px-4 py-6">
                    <Link href="/properties" className='flex align-middle text-blue-500'><FaArrowCircleLeft className='mt-[5px] mr-2'/>Back to properties</Link>
                    <div className="container-xl lg:container m-auto px-4 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {properties.length ? properties.map((property) => 
                                <PropertyCard
                                    key={property._id}
                                    property={property}
                                />
                                ) : <h3 className='text-center text-xl'>No matching properties!!</h3>
                            }
                        </div>
                    </div>
                </section>
            </>
            }
        </>
    )
}

export default SearchResults