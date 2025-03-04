import { getProject } from "@/action/projects";
import { notFound } from "next/navigation";
import SprintCreationForm from "../_components/SprintCreationForm";

export default async function ProjectPage({params}) {
  const {projectId} = await params;
  const project = await getProject(projectId);
  if(!project){
    notFound();
  }
  return (
    <div className="container mx-auto">
      {/* sprint creating */}
      <SprintCreationForm
      projectTitle={project.name}
      projectId={project.id}
      projectKey={project.key}
      sprintKey={project.sprints?.length + 1}
      />

      {/* Sprint board */}
      {project.sprints.length > 0? 
      <></> : <div>Create a Sprint above button</div>  
    }
    </div>
  )
}
