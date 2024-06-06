'use client'
import PropertyCard from '@/components/PropertyCard'
import Spinner from '@/components/Spinner'
import { getSavedProperties } from '@/utils/actions'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const SavedProperties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const getSavedPropertiesFn = async () => {
    try {
      let resp = await getSavedProperties()
      resp && setProperties(resp)
    } catch (error) {
      console.error(error)
      toast.error("Failed to fetch saved properties!!")
    } finally {
      setLoading(false)
    }
  }
  useEffect(()=>{
    getSavedPropertiesFn()
  },[])
  return (
    <>
    {loading ? <Spinner loading={loading}/> : 
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => 
                <PropertyCard
                  key={property._id}
                  property={property}
                />
              )
            }
          </div>
        </div>
      </section>
    }
    </>
  )
}

export default SavedProperties