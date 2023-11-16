import {Route, Routes} from "react-router-dom";
import HomeDashboard from "./HomeDashboard.tsx";
import MyDashboard from "./MyDashboard.tsx";

const DashboardRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/own-dashboard" element={<MyDashboard isInputDisabled isEditing />} />
        </Routes>
    );
};

export default DashboardRouting;