import {Navigate, Route, Routes} from 'react-router-dom';
import Layout from "./components/layout/Layout.tsx";
import UserRouting from "./pages/users/UserRouting.tsx";
import ProjectRouting from "./pages/projects/ProjectRouting.tsx";
import PlannerRouting from "./pages/planner/PlannerRouting.tsx";
import LogsList from "./pages/log/LogsList.tsx";
import DashboardRouting from "./pages/dashboard/DashboardRouting.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import {useAuthentication} from "./auth/AuthenticationHooks.ts";
import LogoutPage from "./pages/logout/LogoutPage.tsx";

interface Props {
    isAuth: boolean;
}

const Router = ({ isAuth = false }: Props) => {
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
            <Route>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route>
                <Route element={authenticatedElement(<Layout />)}>
                    <Route path="dashboard/*" element={/*isAuth ?*/ <DashboardRouting /> /*: <Navigate to="/login" />*/ } />
                    <Route path="users/*" element={ /*isAuth ?*/ <UserRouting /> /*: <Navigate to="/login" />*/ } />
                    <Route path="projects/*" element={/*isAuth ?*/ <ProjectRouting /> /*: <Navigate to="/login" />*/ } />
                    <Route path="planner/*" element={/*isAuth ?*/ <PlannerRouting /> /*: <Navigate to="/login" />*/ } />
                    <Route path="logs/*" element={/*isAuth ?*/ <LogsList /> /*: <Navigate to="/login" />*/ } />
                </Route>
            </Route>

            <Route>
                <Route path="/logout" element={<LogoutPage />} />
            </Route>
        </Routes>
    );
};

export default Router;