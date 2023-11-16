import {Navigate, Route, Routes} from 'react-router-dom';
import Layout from "./components/layout/Layout.tsx";
import UserRouting from "./pages/users/UserRouting.tsx";
import ProjectRouting from "./pages/projects/ProjectRouting.tsx";
import PlannerRouting from "./pages/planner/PlannerRouting.tsx";
import LogsList from "./pages/log/LogsList.tsx";
import DashboardRouting from "./pages/dashboard/DashboardRouting.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";

interface Props {
    isAuth: boolean;
}

const Router = ({ isAuth = false }: Props) => {
    return (
        <Routes>
            <Route>
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route>
                <Route element={<Layout />}>
                    <Route path="dashboard/*" element={/*isAuth ?*/ <DashboardRouting /> /*: <Navigate to="/login" />*/ } />
                    <Route path="users/*" element={ /*isAuth ?*/ <UserRouting /> /*: <Navigate to="/login" />*/ } />
                    <Route path="projects/*" element={/*isAuth ?*/ <ProjectRouting /> /*: <Navigate to="/login" />*/ } />
                    <Route path="planner/*" element={/*isAuth ?*/ <PlannerRouting /> /*: <Navigate to="/login" />*/ } />
                    <Route path="logs/*" element={/*isAuth ?*/ <LogsList /> /*: <Navigate to="/login" />*/ } />
                </Route>
            </Route>

            <Route>
                <Route path="/logout" element={<LoginPage />} />
            </Route>
        </Routes>
    );
};

export default Router;