import { getProjects } from "@/action/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DeleteProject from "./DeleteProject";

export default async function ProjectsList({orgId}) {
    const projects = await getProjects(orgId);

    if(projects.length === 0){
        return(
            <div>
                <p>No Project Found</p>
                <Link href="/project/create" className="underline underline-offset-2 text-blue-200">
                Create New
                </Link>
            </div>
        )
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map(project=>(
                <Card key={project.id}>
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle>{project.name}</CardTitle>
                  <DeleteProject projectId={project.id} />
                </CardHeader>
                <CardContent >
                  <p className="text-gray-500 text-sm mb-4">{project.description.substring(0, 45)}...<span className="text-blue-500 cursor-pointer">see more</span>
                  </p>
                  <Link
                  href={`/project/${project.id}`}
                  className="text-blue-500 hover:underline"
                  >
                  View Project
                  </Link>
                </CardContent>
              </Card>
            ))}
        </div>
    )

}
