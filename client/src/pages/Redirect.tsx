import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getStoreUserAuth } from "../redux/actions/authActions";

const RedirectPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isActive } = getStoreUserAuth();
    useEffect(() => {
        if (isActive) return navigate("/requireActiveUser/profile");
        if (isAuthenticated) return navigate("/requireUser/profile");
        return navigate("/public/login");
    }, [isAuthenticated, navigate, isActive]);
    return <div>loading</div>;
};
export default RedirectPage;
