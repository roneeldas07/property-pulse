import connectDB from "@/config/connectionDB"
import Message from "@/models/MessageModel"
import { getSessionUser } from "@/utils/getSessionUser"

//GET api/message
export const GET = async () => {
    try {
        await connectDB()
        const session = await getSessionUser()
        if(!session || !session.userId) {
            return new Response("User ID is required", {status:401})
        }
        const {userId} = session
        let unreadMessages = await Message.find({recipient: userId, isRead: false}).sort({createdAt: -1})
        let readMessages = await Message.find({recipient: userId, isRead: true}).sort({createdAt: -1})
        const messageObj = [
            ...unreadMessages,
            ...readMessages
        ]
        return new Response(JSON.stringify(messageObj),{status: 200})
    } catch (error) {
        console.error(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}

//DELETE api/message
export const DELETE = async (request) => {
    try {
        await connectDB()
        const session = await getSessionUser()
        if(!session || !session.userId) {
            return new Response("User ID is required", {status:401})
        }
        const { messageId } = await request.json()
        const deleteMessage = await Message.findByIdAndDelete(messageId)
        return new Response(JSON.stringify(deleteMessage), {status:200})
    } catch (error) {
        console.error(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}

//PUT api/message
export const PUT = async (request) => {
    try {
        await connectDB()
        const session = await getSessionUser()
        if(!session || !session.userId) {
            return new Response("User ID is required", {status:401})
        }
        const messageObj = await request.json()
        const messageData = {
            "sender": messageObj.sender,
            "recipient": messageObj.recipient,
            "senderName": messageObj.senderName,
            "senderEmail": messageObj.senderEmail,
            "senderPhone": messageObj.senderPhone,
            "property": messageObj.property,
            "propertyName": messageObj.propertyName,
            "message": messageObj.message,
            "isRead": true,
        }
        let message = await Message.findByIdAndUpdate(messageObj._id, messageData)
        return new Response(JSON.stringify(message), {status:200})
    } catch (error) {
        console.error(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}

//POST api/message
export const POST = async (request) => {
    try {
        await connectDB()
        const session = await getSessionUser()

        if(!session || !session.userId) {
            return new Response("User ID is required", {status:401})
        }
        const {userId} = session
        const {senderName, senderEmail, senderPhone, message, property, propertyName, owner } = await request.json()
        if(userId == owner) {
            return new Response(JSON.stringify({message:'You are the owner of this property. Cannot send message to self.'}), {status: 509})
        }
        const messageData = {
            "sender": userId,
            "recipient": owner,
            "senderName": senderName,
            "senderEmail": senderEmail,
            "senderPhone": senderPhone,
            "property": property,
            "propertyName": propertyName,
            "message": message,
            "isRead": false,
        }  
        console.log(messageData) 
        const messageSave = new Message(messageData)
        await messageSave.save()
        return new Response(JSON.stringify(messageSave), {status: 200})
    } catch (error) {
        console.error(error)
        return new Response('Something went wrong here...', {status: 500})
    }
}