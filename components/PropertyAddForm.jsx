'use client'
import React, { useState } from 'react'

const PropertyAddForm = () => {
    const [property, setProperty] = useState({
        "name": "Test Retreat",
        "type": "Apartment",
        "description": "This is a beautiful apartment located near the commons. It is a 2 bedroom apartment with a full kitchen and bathroom. It is available for weekly or monthly rentals.",
        "location": {
          "street": "120 Tremont Street",
          "city": "Boston",
          "state": "MA",
          "zipcode": "02108"
        },
        "beds": 2,
        "baths": 1,
        "square_feet": 1500,
        "amenities": [
          "Wifi",
          "Full Kitchen",
          "Washer & Dryer",
          "Dishwasher",
          "Gym/Fitness Center",
          "Air Conditioning",
          "Balcony/Patio",
          "Smart TV",
          "Coffee Maker"
        ],
        "rates": {
          "weekly": 1100,
          "monthly": 4200,
          "nightly" : ""
        },
        "seller_info": {
          "name": "John Doe",
          "email": "john@gmail.com",
          "phone": "617-555-5555"
        },
        "images": [],
    })
    const handleChange = (e) => {
        let {value, name:key} = e.target
        let updateState = JSON.parse(JSON.stringify(property))
        if(key.includes('.')){
            let[key1, key2] = key.split('.')
            updateState[key1][key2] = value
        } else {
            updateState[key] = value
        }
        setProperty(updateState)
    }
    const handleImageChange = (e) => {
        let {files} = e.target
        let updateState = JSON.parse(JSON.stringify(property))
        for(const file of files){
            updateState.images.push(file)
        }
        setProperty(updateState)
    }
    const handleAmenitiesChange = (e) => {
        let {checked, value} = e.target
        let updateState = JSON.parse(JSON.stringify(property))
        if(checked) updateState.amenities.push(value)
        else {
            let index = updateState.amenities.indexOf(value)
            if(index !== -1) updateState.amenities.splice(index,1)
        }
        setProperty(updateState)
    }
    return (
        <form action={"/api/properties/add"} method='POST' encType='multipart/form-data'>
        <h2 className="text-3xl text-center font-semibold mb-6">
            Add Property
        </h2>

        <div className="mb-4">
            <label
            htmlFor="type"
            className="block text-gray-700 font-bold mb-2"
            >Property Type
            </label>
            <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                required
                onChange={handleChange}
                value={property.type}
            >
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Cabin Or Cottage">Cabin or Cottage</option>
                <option value="Room">Room</option>
                <option value="Studio">Studio</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2"
            >Listing Name
            </label>
            <input
                type="text"
                id="name"
                name="name"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Beautiful Apartment In Miami"
                required
                onChange={handleChange}
                value={property.name}
            />
        </div>
        <div className="mb-4">
            <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
            >Description
            </label>
            <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add an optional description of your property"
                onChange={handleChange}
                value={property.description}
            ></textarea>
        </div>

        <div className="mb-4 bg-blue-50 p-4">
            <label className="block text-gray-700 font-bold mb-2">Location</label>
            <input
                type="text"
                id="street"
                name="location.street"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Street"
                onChange={handleChange}
                value={property.location.street}
            />
            <input
                type="text"
                id="city"
                name="location.city"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="City"
                required
                onChange={handleChange}
                value={property.location.city}
            />
            <input
                type="text"
                id="state"
                name="location.state"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="State"
                required
                onChange={handleChange}
                value={property.location.state}
            />
            <input
                type="text"
                id="zipcode"
                name="location.zipcode"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Zipcode"
                onChange={handleChange}
                value={property.location.zipcode}
            />
        </div>

        <div className="mb-4 flex flex-wrap">
            <div className="w-full sm:w-1/3 pr-2">
            <label htmlFor="beds" className="block text-gray-700 font-bold mb-2"
                >Beds
                </label>
            <input
                type="number"
                id="beds"
                name="beds"
                className="border rounded w-full py-2 px-3"
                required
                onChange={handleChange}
                value={property.beds}
            />
            </div>
            <div className="w-full sm:w-1/3 px-2">
            <label htmlFor="baths" className="block text-gray-700 font-bold mb-2"
                >Baths
                </label>
            <input
                type="number"
                id="baths"
                name="baths"
                className="border rounded w-full py-2 px-3"
                required
                onChange={handleChange}
                value={property.baths}
            />
            </div>
            <div className="w-full sm:w-1/3 pl-2">
            <label
                htmlFor="square_feet"
                className="block text-gray-700 font-bold mb-2"
                >Square Feet
                </label>
            <input
                type="number"
                id="square_feet"
                name="square_feet"
                className="border rounded w-full py-2 px-3"
                required
                onChange={handleChange}
                value={property.square_feet}
            />
            </div>
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2"
            >Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div>
                <input
                    type="checkbox"
                    id="amenity_wifi"
                    name="amenities"
                    value="Wifi"
                    checked={property.amenities.includes("Wifi")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_wifi">Wifi</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="amenity_kitchen"
                    name="amenities"
                    value="Full Kitchen"
                    checked={property.amenities.includes("Full Kitchen")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_kitchen">Full Kitchen</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="amenity_washer_dryer"
                    name="amenities"
                    value="Washer & Dryer"
                    checked={property.amenities.includes("Washer & Dryer")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="amenity_free_parking"
                    name="amenities"
                    value="Free Parking"
                    checked={property.amenities.includes("Free Parking")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_free_parking">Free Parking</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="amenity_pool"
                    name="amenities"
                    value="Swimming Pool"
                    checked={property.amenities.includes("Swimming Pool")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_pool">Swimming Pool</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="amenity_hot_tub"
                    name="amenities"
                    value="Hot Tub"
                    checked={property.amenities.includes("Hot Tub")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_hot_tub">Hot Tub</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="amenity_24_7_security"
                    name="amenities"
                    value="24/7 Security"
                    checked={property.amenities.includes("24/7 Security")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_24_7_security">24/7 Security</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="amenity_wheelchair_accessible"
                    name="amenities"
                    value="Wheelchair Accessible"
                    checked={property.amenities.includes("Wheelchair Accessible")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_wheelchair_accessible"
                >Wheelchair Accessible
                </label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="amenity_elevator_access"
                    name="amenities"
                    value="Elevator Access"
                    checked={property.amenities.includes("Elevator Access")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_elevator_access">Elevator Access</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="amenity_dishwasher"
                    name="amenities"
                    value="Dishwasher"
                    checked={property.amenities.includes("Dishwasher")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_dishwasher">Dishwasher</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="amenity_gym_fitness_center"
                    name="amenities"
                    value="Gym/Fitness Center"
                    checked={property.amenities.includes("Gym/Fitness Center")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_gym_fitness_center"
                >Gym/Fitness Center
                </label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="amenity_air_conditioning"
                    name="amenities"
                    value="Air Conditioning"
                    checked={property.amenities.includes("Air Conditioning")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="amenity_balcony_patio"
                    name="amenities"
                    value="Balcony/Patio"
                    checked={property.amenities.includes("Balcony/Patio")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="amenity_smart_tv"
                    name="amenities"
                    value="Smart TV"
                    checked={property.amenities.includes("Smart TV")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_smart_tv">Smart TV</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="amenity_coffee_maker"
                    name="amenities"
                    value="Coffee Maker"
                    checked={property.amenities.includes("Coffee Maker")}
                    className="mr-2"
                    onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
            </div>
            </div>
        </div>

        <div className="mb-4 bg-blue-50 p-4">
            <label className="block text-gray-700 font-bold mb-2"
            >Rates (Leave blank if not applicable)
            </label>
            <div
            className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
            <div className="flex items-center">
                <label htmlFor="weekly_rate" className="mr-2">Weekly</label>
                <input
                    type="number"
                    id="weekly_rate"
                    name="rates.weekly"
                    className="border rounded w-full py-2 px-3"
                    onChange={handleChange}
                    value={property.rates.weekly}
                />
            </div>
            <div className="flex items-center">
                <label htmlFor="monthly_rate" className="mr-2">Monthly</label>
                <input
                    type="number"
                    id="monthly_rate"
                    name="rates.monthly"
                    className="border rounded w-full py-2 px-3"
                    onChange={handleChange}
                    value={property.rates.monthly}
                />
            </div>
            <div className="flex items-center">
                <label htmlFor="nightly_rate" className="mr-2">Nightly</label>
                <input
                    type="number"
                    id="nightly_rate"
                    name="rates.nightly"
                    className="border rounded w-full py-2 px-3"
                    onChange={handleChange}
                    value={property.rates.nightly}
                />
            </div>
            </div>
        </div>

        <div className="mb-4">
            <label
            htmlFor="seller_name"
            className="block text-gray-700 font-bold mb-2"
            >Seller Name
            </label>
            <input
                type="text"
                id="seller_name"
                name="seller_info.name"
                className="border rounded w-full py-2 px-3"
                placeholder="Name"
                onChange={handleChange}
                value={property.seller_info.name}
            />
        </div>
        <div className="mb-4">
            <label
            htmlFor="seller_email"
            className="block text-gray-700 font-bold mb-2"
            >Seller Email
            </label>
            <input
                type="email"
                id="seller_email"
                name="seller_info.email"
                className="border rounded w-full py-2 px-3"
                placeholder="Email address"
                required
                onChange={handleChange}
                value={property.seller_info.email}
            />
        </div>
        <div className="mb-4">
            <label
            htmlFor="seller_phone"
            className="block text-gray-700 font-bold mb-2"
            >Seller Phone
            </label>
            <input
                type="tel"
                id="seller_phone"
                name="seller_info.phone"
                className="border rounded w-full py-2 px-3"
                placeholder="Phone"
                onChange={handleChange}
                value={property.seller_info.phone}
            />
        </div>

        <div className="mb-4">
            <label htmlFor="images" className="block text-gray-700 font-bold mb-2"
            >Images (Select up to 4 images)
            </label>
            <input
                type="file"
                id="images"
                name="images"
                className="border rounded w-full py-2 px-3"
                accept="image/*"
                multiple
                required
                onChange={handleImageChange}
            />
        </div>

        <div>
            <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
            >
            Add Property
            </button>
        </div>
        </form>
    )
}

export default PropertyAddForm