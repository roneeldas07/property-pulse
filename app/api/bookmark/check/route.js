import connectDB from "@/config/connectionDB"
import User from "@/models/UserModel"
import { getSessionUser } from "@/utils/getSessionUser"

//POST api/bookmark/check
export const POST = async (request) => {
    try {
        await connectDB()
        const session = await getSessionUser()
        if(!session || !session.userId) {
            return new Response("User ID is required", {status:401})
        }
        const {userId} = session
        let user = await User.findById(userId)
        if(!user) return new Response('User Not Found', {status: 404})
        const {propertyId} = await request.json()
        let bookmarked = false
        if(user.bookmarks.includes(propertyId)) bookmarked = true
        return new Response(JSON.stringify({isBookmarked: bookmarked}),{status: 200})
    } catch (error) {
        console.error(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}