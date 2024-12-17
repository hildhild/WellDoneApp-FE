import { data, ProjectList } from "@/Utils/constant";
import ProjectDetail from "./ProjectDetail";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
import { View, Text } from "react-native";

const ProjectDetailContainer = () => {
    const {id} = useSelector((state: RootState) => state.project);
    if(!id) return (
    <View>
        <Text>No project available</Text>
    </View>);
    return <ProjectDetail  project={data}/>
}

export default ProjectDetailContainer;