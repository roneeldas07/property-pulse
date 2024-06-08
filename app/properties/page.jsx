import React from 'react'
import SearchBar from '@/components/SearchBar'
import Properties from '@/components/Properties'

const PropertiesPage = () => {
  return (
    <>
      <section className="bg-blue-700 py-3 mb-4">
        <SearchBar/>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Properties/>
        </div>
      </section>
    </>
  )
}

export default PropertiesPage