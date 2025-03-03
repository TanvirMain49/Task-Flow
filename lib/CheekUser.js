import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";

export const cheekUser = async () => {
    const user = await currentUser();

    if (!user) return null;

    try {
        // cheek if the user already exist in the database or not
        const loggedInUser = await db?.user.findUnique({
            where: {
                clerkUserId: user.id,
            }
        })
        if(loggedInUser){
            return loggedInUser;
        }
        const name = `${user?.firstName} ${user?.lastName}`;

        // create new user in the database
        const newUser = await db.user.create({
            data:{
                clerkUserId: user?.id,
                name,
                imageURL: user?.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            }
        })
        return newUser;

    } catch (error) {
        console.log(error)
    }
}