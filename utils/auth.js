import connectDB from "@/config/connectionDB";
import User from "@/models/UserModel";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        async signIn ({profile}) {
            await connectDB();
            let userExists = await User.findOne({email : profile.email})
            console.log("userExists", userExists)
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name,
                    image: profile.image
                })
            }
            return true;
        },
        async session ({session}) {
            await connectDB();
            let user = await User.findOne({email : session.user.email})
            if(user?._id) session.user.id = user._id.toString()
            return session;
        }
    }
}