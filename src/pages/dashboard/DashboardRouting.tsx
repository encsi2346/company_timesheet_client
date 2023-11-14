import {Route, Routes} from "react-router-dom";
import HomeDashboard from "./HomeDashboard.tsx";
import OwnDashboard from "./OwnDashboard.tsx";

const DashboardRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/own-dashboard" element={<OwnDashboard isInputDisabled isEditing />} />
        </Routes>
    );
};

export default DashboardRouting;