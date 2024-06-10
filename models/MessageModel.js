import { Schema,model,models } from "mongoose";

const MessageSchema = new Schema({
    sender : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender is required'],
    },
    recipient : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Recipient is required'],
    },
    senderName: {
        type: String,
        required: [true, 'Sender Name is required'],
    },
    senderEmail: {
        type: String,
        required: [true, 'Sender Email is required'],
    },
    senderPhone: {
        type: String,
        required: [true, 'Sender Phone Number is required'],
    },
    property : {
        type: Schema.Types.ObjectId,
        ref: 'Property',
        required: [true, 'Property is required'],
    },
    propertyName: {
        type: String,
        required: [true, 'Property Name is required'],
    },
    message : {
        type: String,
        required: [true, 'Message is required'],
    },
    isRead : {
        type: Boolean,
    }
},{
    timestamps: true
})

const Message = models.Message || model('Message',MessageSchema)
export default Message