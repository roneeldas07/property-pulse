import connectDB from "@/config/connectionDB"
import Property from "@/models/PropertyModel"
import { getSessionUser } from "@/utils/getSessionUser"

//GET api/properties/:id
export const GET = async (request,{params}) => {
    try {
        await connectDB()
        const property = await Property.findById(params.id)
        if(!property) return new Response('Property Not Found', {status: 404})
        return new Response(JSON.stringify(property),{status: 200})
    } catch (error) {
        console.error(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}

//DELETE api/properties/:id
export const DELETE = async (request,{params}) => {
    try {
        await connectDB()
        const property = await Property.findById(params.id)
        if(!property){
            return new Response("Property Not Found!!.", {status: 404})
        }
        const session = await getSessionUser()
        if(!session || !session.userId) {
            return new Response("User ID is required", {status:401})
        }
        const {userId} = session
        //Authorization to check if deleting user is the owner of the property.
        if(userId !== property.owner.toString()) {
            throw new Error("User ID does not match with the owner ID.")
        }
        const deleteProperty = await Property.findByIdAndDelete(params.id)
        return new Response(JSON.stringify(deleteProperty), {status:200})
    } catch (error) {
        console.error(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}

//PUT api/properties/:id
export async function PUT (body, {params}) {
    try {
        await connectDB()
        const session = await getSessionUser()
        if(!session || !session.userId) {
            return new Response("User ID is required", {status:401})
        }
        const {userId} = session
        const formData = await body.formData()
        const amenities = formData.getAll('amenities')
        const propertyData = {
            "name": formData.get('name'),
            "type": formData.get('type'),
            "description": formData.get('description'),
            "location": {
              "street": formData.get('location.street'),
              "city": formData.get('location.city'),
              "state": formData.get('location.state'),
              "zipcode": formData.get('location.zipcode'),
            },
            "beds": formData.get('beds'),
            "baths": formData.get('baths'),
            "square_feet": formData.get('square_feet'),
            amenities,
            "rates": {
              "weekly": formData.get('rates.weekly'),
              "monthly": formData.get('rates.monthly'),
              "nightly": formData.get('rates.nightly'),
            },
            "seller_info": {
              "name": formData.get('seller_info.name'),
              "email": formData.get('seller_info.email'),
              "phone": formData.get('seller_info.phone'),
            },
            "owner": userId,
        }
        
        let property = await Property.findByIdAndUpdate(params.id, propertyData)
        return new Response(JSON.stringify(property), {status:200})
    } catch (error) {
        console.error(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}