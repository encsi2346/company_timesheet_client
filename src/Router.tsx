import {Navigate, Route, Routes} from 'react-router-dom';
import Layout from "./components/layout/Layout.tsx";
import UserRouting from "./pages/users/UserRouting.tsx";
import ProjectRouting from "./pages/projects/ProjectRouting.tsx";
import PlannerRouting from "./pages/planner/PlannerRouting.tsx";
import LogsList from "./pages/log/LogsList.tsx";
import DashboardRouting from "./pages/dashboard/DashboardRouting.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import LogoutPage from "./pages/logout/LogoutPage.tsx";
import {useAuthentication} from "./auth/AuthProvider.tsx";

const Router = () => {
    const auth = useAuthentication();

    const loading = (<span>Loading... please wait!</span>);

    const toLogin = (<Navigate to="/login" />);

    const authenticatedElement = (element : JSX.Element) => {
        if (auth.isAuthenticated) {
            return element;
        } else {
            return auth.isAuthenticated === false ? toLogin : loading;
        }
    }

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />

            <Route>
                <Route element={authenticatedElement(<Layout />)}>
                    <Route path="dashboard/*" element={<DashboardRouting />} />
                    <Route path="users/*" element={ <UserRouting />} />
                    <Route path="projects/*" element={<ProjectRouting />} />
                    <Route path="planner/*" element={<PlannerRouting />} />
                    <Route path="logs/*" element={<LogsList />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;