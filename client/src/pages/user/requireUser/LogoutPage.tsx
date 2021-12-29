import { logoutFromAll, singleLogout } from "../../../api/user/authApi";
import { removeUserData } from "../../../redux/actions/authActions";
import { useNavigate } from "react-router";

const LogoutPage = () => {
    const navigate = useNavigate();
    const singleLogoutHandler = async () => {
        await singleLogout();
        removeUserData();
        navigate("/");
    };
    const logoutFromAllHandler = async () => {
        const res = await logoutFromAll();
        if (!res) return;
        removeUserData();
        navigate("/");
    };
    return (
        <div>
            <div>logout page</div>
            <div>
                <button onClick={singleLogoutHandler}>logout</button>
            </div>
            <div>
                <button onClick={logoutFromAllHandler}>logout from all sessions</button>
            </div>
        </div>
    );
};
export default LogoutPage;
