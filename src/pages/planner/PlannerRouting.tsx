import {Route, Routes} from "react-router-dom";
import PlannerSelector from "./PlannerSelector.tsx";
import EmployeesPlanner from "./EmployeesPlanner.tsx";
import OwnPlanner from "./OwnPlanner.tsx";

const PlannerRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<PlannerSelector />} />
            <Route path="/own/:id" element={<OwnPlanner isInputDisabled isEditing />} />
            <Route path="/employees-planner/" element={<EmployeesPlanner />} />
        </Routes>
    );
};

export default PlannerRouting;