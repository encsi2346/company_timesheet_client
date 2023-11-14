import {Route, Routes} from "react-router-dom";
import PlannerSelector from "./PlannerSelector.tsx";
import EmployeesPlannerList from "./EmployeesPlannerList.tsx";
import MyPlanner from "./MyPlanner.tsx";

const PlannerRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<PlannerSelector />} />
            <Route path="/my-planner/:id" element={<MyPlanner isInputDisabled isEditing />} />
            <Route path="/employees-planner" element={<EmployeesPlannerList />} />
        </Routes>
    );
};

export default PlannerRouting;