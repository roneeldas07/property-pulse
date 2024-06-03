'use client'
import { deleteProperty } from '@/utils/actions'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const PropertyList = ({property}) => {
    const router = useRouter()
    const deleteReq = async (propertyId) => {
        let delResp
        if(window.confirm("Are you sure you want to delete this property?")){
            delResp = await deleteProperty(propertyId)
            if(delResp) {
                toast.success(`Property Deleted Successfully!!`)
                router.refresh()
            } else {
                toast.error(`Failed to delete property!!`)
            }
        } else {

        }
    }
    return (
        <div className="mb-10" key={property._id}>
            <Link href={`/properties/${property._id}`}>
                <Image
                    className="h-32 w-full rounded-md object-cover"
                    src={property.images[0]}
                    alt="Property"
                    width={0}
                    height={0}
                    sizes='100vw'
                />
            </Link>
            <div className="mt-2">
                <p className="text-lg font-semibold">{property.name}</p>
                <p className="text-gray-600">Address: {`${property.location.street} ${property.location.city}, ${property.location.state} ${property.location.zipcode}`}</p>
            </div>
            <div className="mt-2">
                <Link href={`/properties/${property._id}/edit`}
                    className="bg-blue-500 text-white px-3 py-2 rounded-md mr-2 hover:bg-blue-600"
                >
                    Edit
                </Link>
                <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    type="button" onClick={() => deleteReq(property._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default PropertyList