'use client'
import React, { useEffect, useState } from 'react'
import PropertyCard from './PropertyCard'
import { fetchProperties } from '@/utils/actions'
import Spinner from './Spinner'
import { toast } from 'react-toastify'
import Pagination from './Pagination'

const Properties = ({location, type}) => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const cardsPerPage = 6

    const fetchPropertiesFn = async (location, type) => {
        try {
            setLoading(true)
            const response = await fetchProperties(page, cardsPerPage, location, type)
            setTotalPages(Math.ceil(response.total/cardsPerPage))
            setProperties(response.properties)
        } catch (error) {
            console.error(error)
            toast.error("Failed to fetch properties")
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchPropertiesFn(location, type)
    },[])

    useEffect(()=>{
        fetchPropertiesFn(location, type)
    },[location, type, page])

    return (
        <>
            {loading ? <Spinner loading={loading}/> :
                <div className='flex flex-col gap-2'>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {properties.length ? properties.map((property) => 
                            <PropertyCard
                                key={property._id}
                                property={property}
                            />
                            ) : <h3 className='text-center text-xl'>No matching properties!!</h3>
                        }
                    </div>
                    {totalPages > 1 && <Pagination page={page} totalPages={totalPages} setPage={setPage}/>}
                </div>
            }
        </>
    )
}

export default Properties