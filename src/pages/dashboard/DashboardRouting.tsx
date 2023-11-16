import {Route, Routes} from "react-router-dom";
import HomeDashboard from "./HomeDashboard.tsx";
import MyDashboard from "./MyDashboard.tsx";

const DashboardRouting = () => {
    return (
        <Routes>
            <Route path="/home-dashboard" element={<HomeDashboard />} />
            <Route path="/my-dashboard" element={<MyDashboard />} />
        </Routes>
    );
};

export default DashboardRouting;