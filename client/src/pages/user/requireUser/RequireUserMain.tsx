import ProfilePage from "./ProfilePage";
import { Navigate, Routes, useNavigate } from "react-router";
import { Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stateType } from "../../../redux/reducers/mainReducer";
import SettingsPage from "./SettingsPage";
import LogoutPage from "./LogoutPage";
import ChangePasswordPage from "./ChangePasswordPage";
import DeleteAccountPage from "./DeleteAccountPage";

const RequireUserPage = () => {
    const navigate = useNavigate();
    const [loaded, setIsLoaded] = useState(false);
    const { isAuthenticated } = useSelector((state: stateType) => state.auth);
    useEffect(() => {
        if (!isAuthenticated) return navigate("/");
        setIsLoaded(true);
    }, [isAuthenticated, navigate]);
    return (
        <div>
            {loaded ? (
                <Routes>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/changePassword" element={<ChangePasswordPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/deleteAccount" element={<DeleteAccountPage />} />
                    <Route path="*" element={<Navigate to="/notFound" />} />
                </Routes>
            ) : (
                "loading"
            )}
        </div>
    );
};
export default RequireUserPage;
