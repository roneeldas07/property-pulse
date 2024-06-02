import cloudinary from "@/config/cloudinary"
import connectDB from "@/config/connectionDB"
import Property from "@/models/PropertyModel"
import { getSessionUser } from "@/utils/getSessionUser"


//POST api/properties/add
export async function POST (body) {
    try {
        await connectDB()
        const session = await getSessionUser()

        if(!session || !session.userId) {
            return new Response("User ID is required", {status:401})
        }
        const {userId} = session
        const formData = await body.formData()
        const amenities = formData.getAll('amenities')
        const images = formData.getAll('images').filter((image) => image.name != '')
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

        const imageUploadPromises = []
        for(let image of images) {
          const imageBuffer = await image.arrayBuffer()
          const imageArray = Array.from(new Uint8Array(imageBuffer))
          const imageData = Buffer.from(imageArray).toString('base64')
          const imageResult = await cloudinary.uploader.upload(`data:image/png;base64,${imageData}`,{
            folder: 'propertypulse',
          })
          imageUploadPromises.push(imageResult.secure_url)
        }
        const uploadedImages = await Promise.all(imageUploadPromises)
        propertyData.images = uploadedImages
        
        const properties = new Property(propertyData)
        await properties.save()
        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${properties._id}`)
    } catch (error) {
        console.error(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}