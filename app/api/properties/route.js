import connectDB from "@/config/connectionDB"
import Property from "@/models/PropertyModel"

//GET api/properties
export async function GET (request) {
    try {
        await connectDB()
        const properties = await Property.find({})
        return new Response(JSON.stringify(properties),{status: 200})
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}