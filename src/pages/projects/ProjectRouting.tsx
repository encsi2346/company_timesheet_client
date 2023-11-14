import {Route, Routes} from "react-router-dom";
import ProjectList from "./ProjectList.tsx";
import ProjectEdit from "./ProjectEdit.tsx";

const ProjectRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path=":id" element={<ProjectEdit isInputDisabled isEditing />} />
            <Route path="/new" element={<ProjectEdit />} />
            <Route path="/edit/:id" element={<ProjectEdit isEditing />} />
        </Routes>
    );
};

export default ProjectRouting;