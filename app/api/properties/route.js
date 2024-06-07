import connectDB from "@/config/connectionDB"
import Property from "@/models/PropertyModel"

//GET api/properties
export async function GET (request) {
    try {
        await connectDB()
        const {searchParams} = new URL(request.url)
        const location = searchParams.get("location")
        const type = searchParams.get("type")
        let properties
        if(!location && !type)
            properties = await Property.find({})
        else {
            let pattern = new RegExp(location, 'i')
            let query = {
                $or: [
                    {name: pattern},
                    {description: pattern},
                    {'location.street': pattern},
                    {'location.city': pattern},
                    {'location.state': pattern},
                    {'location.zipcode': pattern},
                ]
            }
            if(type !== 'All'){
                const typePattern = new RegExp(type,'i')
                query.type = typePattern
            }
            properties = await Property.find(query)
        }
        return new Response(JSON.stringify(properties),{status: 200})
    } catch (error) {
        console.error(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}