import { Route, Routes } from 'react-router-dom';
import Layout from "./components/layout/Layout.tsx";
import UserRouting from "./pages/users/UserRouting.tsx";
import ProjectRouting from "./pages/projects/ProjectRouting.tsx";
import PlannerRouting from "./pages/planner/PlannerRouting.tsx";
import LogsList from "./pages/log/LogsList.tsx";
import DashboardRouting from "./pages/dashboard/DashboardRouting.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";

const Router = () => {
    return (
        <Routes>
            <Route>
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route>
                <Route element={<Layout />}>
                    <Route path="dashboard/*" element={<DashboardRouting />} />
                    <Route path="users/*" element={<UserRouting />} />
                    <Route path="projects/*" element={<ProjectRouting />} />
                    <Route path="planner/*" element={<PlannerRouting />} />
                    <Route path="logs/*" element={<LogsList />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;