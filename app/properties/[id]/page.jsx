'use client'
import React, {useEffect, useState} from 'react'
import { useParams } from 'next/navigation'
import { fetchProperty } from '@/utils/actions'

const PropertyPage = () => {
    const [property, setProperty] = useState({})
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    useEffect(()=>{
        const fetchPropertyData = async () => {
            try {
                let fetchedProperty = await fetchProperty(id)
                setProperty(fetchedProperty)
            } catch (error) {
                console.log("Error in fetching record", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPropertyData()
    },[])

    return (
        <div>{JSON.stringify(property)}</div>
    )
}

export default PropertyPage