import connectDB from "@/config/connectionDB"
import Property from "@/models/PropertyModel"
import User from "@/models/UserModel"
import { getSessionUser } from "@/utils/getSessionUser"

//GET api/properties/saved
export const GET = async () => {
    try {
        await connectDB()
        const session = await getSessionUser()
        if(!session || !session.userId) {
            return new Response("User ID is required", {status:401})
        }
        const {userId} = session
        let user = await User.findById(userId)
        if(!user) return new Response('User Not Found', {status: 404})
        console.log(user.bookmarks)
        const savedProperties = await Property.find({_id: {$in : user.bookmarks}})
        return new Response(JSON.stringify(savedProperties),{status: 200})
    } catch (error) {
        console.error(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}