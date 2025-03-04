"use server"
import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

// Function to create a project
export async function createProjects(data) {
    const { userId, orgId } = auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }
    if (!orgId) {
        throw new Error("No Organization Selected");
    }

    const { data: membership } = await clerkClient().organizations.getOrganizationMembershipList({ organizationId: orgId });

    const userMembership = membership.find(member => member.publicUserData.userId === userId);

    if (!userMembership || userMembership.role !== "org:admin") {
        throw new Error("Only organization admin can create project!");
    }

    try {
        const project = await db.project.create({
            data: {
                name: data.name,
                key: data.key,
                description: data.description,
                organizationId: orgId,
            }
        });
        return project;
    } catch (error) {
        throw new Error(`Error creating project: ${error.message}`);
    }
}

// Function to get projects based on orgId
export async function getProjects(orgId) {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId }
    });

    if (!user) {
        throw new Error("User Not Found");
    }

    const projects = await db.project.findMany({
        where: { organizationId: orgId },
        orderBy: { createdAt: "desc" }
    });

    return projects;
}

export async function deleteProject(projectId){
    const {userId, orgId, orgRole} = auth();

    if(!userId || !orgId){
        throw new Error("Unauthorized")
    }

    if(orgRole !== "org:admin"){
        throw new Error("Only organization admin can delete project!");
    }

    const project = await db.project.findUnique({
        where:{id: projectId}
    })

    if(!project || project.organizationId !== orgId){
        throw new Error("Project not found or You do Not have a permission to delete the project!")
    }

    await db.project.delete({
        where:{id: projectId}
    })

    return {success: true};
}
