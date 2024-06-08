'use client'
import Properties from '@/components/Properties'
import SearchBar from '@/components/SearchBar'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'

const SearchResults = () => {
    const searchParams = useSearchParams()
    const location = searchParams.get('location')
    const type = searchParams.get('type')

    return (
        <>
            <section className="bg-blue-700 py-3 mb-4">
                <SearchBar/>
            </section>
            <section className="px-4 py-6">
                <Link href="/properties" className='flex align-middle text-blue-500'><FaArrowCircleLeft className='mt-[5px] mr-2'/>Back to properties</Link>
                <div className="container-xl lg:container m-auto px-4 py-6">
                    <Properties location={location} type={type}/>
                </div>
            </section>
        </>
    )
}

export default SearchResults