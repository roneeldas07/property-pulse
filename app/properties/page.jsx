import React from 'react'
import PropertyCard from '@/components/PropertyCard'
import { fetchProperties } from '@/utils/actions'
import SearchBar from '@/components/SearchBar'

const Properties = async () => {
  const properties = await fetchProperties()
  return (
    <>
    <section className="bg-blue-700 py-3 mb-4">
      <SearchBar/>
    </section>
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
    </>
  )
}

export default Properties