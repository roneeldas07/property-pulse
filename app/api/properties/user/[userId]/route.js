import connectDB from "@/config/connectionDB"
import Property from "@/models/PropertyModel"

//GET api/properties/user/:userId
export const GET = async (request,{params}) => {
    try {
        await connectDB()
        let userId = params.userId
        if(!userId){
            return new Response("User ID is required.", {status: 401})
        }
        const property = await Property.find({"owner":Object(userId)})
        if(!property) return new Response('Property Not Found', {status: 404})
        return new Response(JSON.stringify(property),{status: 200})
    } catch (error) {
        console.error(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}