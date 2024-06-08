'use client'
import React from 'react'

const Pagination = ({page, totalPages, setPage}) => {
    const handlePageChange = (flag) => {
        let updatedPage = flag === "prev" ? page - 1 : page + 1
        setPage(updatedPage)
    }
    return (
        <section className="container mx-auto flex justify-center items-center mt-8 mb-2">
            <button 
                className="mr-2 px-2 py-1 border border-gray-300 rounded disabled:bg-slate-100 disabled:text-slate-400"
                onClick={() => handlePageChange('prev')}
                disabled={page === 1}
            >
                Previous
            </button>
            <span className='mx-2'>
                Page {page} of {totalPages}
            </span>
            <button
                className='ml-2 px-2 py-1 border border-gray-300 rounded disabled:bg-slate-100 disabled:text-slate-400'
                onClick={() => handlePageChange('next')}
                disabled={page === totalPages}
            >
                Next
            </button>
        </section>
    )
}

export default Pagination