'use client'
import React, {useEffect, useState} from 'react'
import { useParams } from 'next/navigation'
import { fetchProperty } from '@/utils/actions'
import HeaderImage from '@/components/HeaderImage'
import { FaArrowLeft, FaBath, FaBed, FaCheck, FaMapMarkerAlt, FaRulerCombined, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Spinner from '@/components/Spinner'
import PropertyImages from '@/components/PropertyImages'
import PropertyBookmarkButton from '@/components/PropertyBookmarkButton'
import PropertyShareButtons from '@/components/PropertyShareButtons'
import ContactSeller from '@/components/ContactSeller'

const PropertyPage = () => {
    const [property, setProperty] = useState({})
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    useEffect(()=>{
        const fetchPropertyData = async () => {
            try {
                let fetchedProperty = await fetchProperty(id)
                setProperty(fetchedProperty)
            } catch (error) {
                console.error("Error in fetching record", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPropertyData()
    },[])

    return (
        <>
        { loading ? <Spinner loading={loading}/>: 
            <div>
                <HeaderImage image={`${property.images[0]}`}/>
                {/*<!-- Go Back -->*/}
                <section>
                    <div className="container m-auto py-6 px-6">
                        <Link
                            href="/properties"
                            className="text-blue-500 hover:text-blue-600 flex items-center"
                        >
                            <FaArrowLeft className="mr-2"/> Back to Properties
                        </Link>
                    </div>
                </section>

                {/*<!-- Property Info -->*/} 
                <section className="bg-blue-50">
                    <div className="container m-auto py-10 px-6">
                        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        <main>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                            <div className="text-gray-500 mb-4">{property.type}</div>
                            <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
                            <div
                                className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                            >
                                <FaMapMarkerAlt className="fa-solid fa-location-dot text-lg text-orange-700 mr-2 mt-1"/>
                                <p className="text-orange-700">
                                    {`${property.location.street} ${property.location.city}, ${property.location.state} ${property.location.zipcode}`}
                                </p>
                            </div>

                            <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                                Rates & Options
                            </h3>
                            <div className="flex flex-col md:flex-row justify-around">
                                <div
                                className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                                >
                                <div className="text-gray-500 mr-2 font-bold">Nightly</div>
                                {property.rates.nightly? 
                                        <div className="text-2xl font-bold text-blue-500">${property.rates.nightly}</div>
                                    :
                                        <div className="text-2xl font-bold">
                                            <FaTimes className="fa fa-xmark text-red-700"/>
                                        </div>
                                }
                                </div>
                                <div
                                className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                                >
                                <div className="text-gray-500 mr-2 font-bold">Weekly</div>
                                {property.rates.weekly? 
                                        <div className="text-2xl font-bold text-blue-500">${property.rates.weekly}</div>
                                    :
                                        <div className="text-2xl font-bold">
                                            <FaTimes className="fa fa-xmark text-red-700"/>
                                        </div>
                                }
                                </div>
                                <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                                <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                                {property.rates.monthly? 
                                        <div className="text-2xl font-bold text-blue-500">${property.rates.monthly}</div>
                                    :
                                        <div className="text-2xl font-bold">
                                            <FaTimes className="fa fa-xmark text-red-700"/>
                                        </div>
                                }
                                </div>
                            </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                            <h3 className="text-lg font-bold mb-6">Description & Details</h3>
                            <div
                                className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9"
                            >
                                <p>
                                <FaBed /> {property.beds}
                                <span className="hidden sm:inline">Beds</span>
                                </p>
                                <p>
                                <FaBath /> {property.baths}
                                <span className="hidden sm:inline">Baths</span>
                                </p>
                                <p>
                                <FaRulerCombined /> {property.square_feet}
                                <span className="hidden sm:inline">sqft</span>
                                </p>
                            </div>
                            <p className="text-gray-500 mb-4">
                                {property.description}
                            </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                            <h3 className="text-lg font-bold mb-6">Amenities</h3>

                            <ul
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none"
                            >
                                {property.amenities.map(amenity => <li className='flex' key={amenity}>
                                    <FaCheck className="text-green-600 mr-2 mt-2"></FaCheck> {amenity}
                                </li>)}
                            </ul>
                            </div>
                        </main>

                        {/*<!-- Sidebar -->*/}
                        <aside className="space-y-4">       
                            <PropertyBookmarkButton property={property}/>
                            <PropertyShareButtons property={property}/>
                            <ContactSeller property={property}/>
                        </aside>
                        </div>
                        <PropertyImages images={property.images}/>
                    </div>
                </section>
            </div>
        }
        </>
    )
}

export default PropertyPage