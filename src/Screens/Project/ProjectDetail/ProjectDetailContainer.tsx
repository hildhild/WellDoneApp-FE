import { ProjectList } from "@/Utils/constant";
import ProjectDetail from "./ProjectDetail";

const ProjectDetailContainer = () => {
    const project = ProjectList[0];
    return <ProjectDetail  project={project}/>
}

export default ProjectDetailContainer;