"use server"
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createSprints(projectId, data) {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized")
    }

    const project = await db.project.findUnique({
        where:{id: projectId}
    })

    if(!project || project.organizationId !== orgId){
        throw new Error("Project Not Found");
    }

    const sprint = await db.sprint.create({
        data:{
            name: data.name,
            startDate: data.startDate,
            endDate:data.endDate,
            status: "PLANNED",
            projectId,
        }
    })

    return sprint;
}