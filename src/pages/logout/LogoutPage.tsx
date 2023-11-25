import {useAuthentication} from "../../auth/AuthenticationHooks.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const LogoutPage = () => {
    const auth = useAuthentication();
    const navigate = useNavigate();

    useEffect(() => {
        auth.logout();

        if (auth.isAuthenticated === false) {
            navigate("/login");
        }
    }, [auth.isAuthenticated]);

    return (
        <div>
            <h1>Logging you out, please wait...</h1>
        </div>
    );
}

export default LogoutPage;