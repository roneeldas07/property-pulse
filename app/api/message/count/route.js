import connectDB from "@/config/connectionDB"
import Message from "@/models/MessageModel"
import { getSessionUser } from "@/utils/getSessionUser"

//GET api/message/count
export const GET = async () => {
    try {
        await connectDB()
        const session = await getSessionUser()
        if(!session || !session.userId) {
            return new Response("User ID is required", {status:401})
        }
        const {userId} = session
        let messages = await Message.countDocuments({recipient: userId,isRead: false})
        return new Response(JSON.stringify(messages),{status: 200})
    } catch (error) {
        console.error(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}