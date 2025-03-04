"use server"
import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server"

export default async function getOrganization(slug) {

    const {userId} = auth();
    // cheek if user is logged in or not
    if(!userId){
        return new Error("Unauthorize")
    }

    // cheek if user is in the database or not
    const user = await db.user.findUnique({
        where:{
            clerkUserId: userId
        },
    })
    if(!user){
        return new Error("User not found")
    }

    // get the organization information by the help of slug that organization have
    const organization = await clerkClient().organizations.getOrganization({
        slug
    })
    if(!organization){
        return null
    }
    // get the members of that organization
    const {data: membership} = await clerkClient().organizations.getOrganizationMembershipList({
        organizationId: organization.id
    })
    const userMembership = membership.find(member => member.publicUserData.userId === userId)

    if(!userMembership){
        return null;
    }

    return organization;

}
