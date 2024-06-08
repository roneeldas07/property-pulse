import connectDB from "@/config/connectionDB"
import Property from "@/models/PropertyModel"

//GET api/properties
export async function GET (request) {
    try {
        await connectDB()
        const {searchParams} = new URL(request.url)
        const location = searchParams.get("location")
        const type = searchParams.get("type")
        const page = searchParams.get("page")
        const pageSize = searchParams.get("recordsPerPage")
        let result = {}
        if(page && pageSize){
            let skip = (page-1)*pageSize
            let total = await Property.countDocuments({})
            let query = {}
            if(!location && !type)
                query = {}
            else {
                if(location){
                    let pattern = new RegExp(location, 'i')
                    query = {
                        $or: [
                            {name: pattern},
                            {description: pattern},
                            {'location.street': pattern},
                            {'location.city': pattern},
                            {'location.state': pattern},
                            {'location.zipcode': pattern},
                        ]
                    }
                }
                if(type !== 'All'){
                    const typePattern = new RegExp(type,'i')
                    query.type = typePattern
                }
            }
            console.log(query)
            total = await Property.countDocuments(query)
            let properties = await Property.find(query).skip(skip).limit(pageSize)
            result = {total,properties}
        } else {
            result = await Property.find({})
        }
        return new Response(JSON.stringify(result),{status: 200})
    } catch (error) {
        console.error(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}