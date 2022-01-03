import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes, useNavigate } from "react-router";
import { Route } from "react-router-dom";
import { stateType } from "../../../redux/reducers/mainReducer";
import ActiveProfilePage from "./ActiveProfilePage";
import PublicProfilePage from "./PublicProfilePage";
import AllUsersPage from "./AllUsersPage";
import NstaffMainPage from "../../nstaff/NstaffMain";

const RequireActiveUserPage = () => {
    const navigate = useNavigate();
    const [loaded, setIsLoaded] = useState(false);
    const { isActive } = useSelector((state: stateType) => state.auth);
    useEffect(() => {
        if (!isActive) return navigate("/");
        setIsLoaded(true);
    }, [isActive, navigate]);
    return (
        <div>
            {loaded ? (
                <Routes>
                    <Route path="/nstaff/*" element={<NstaffMainPage />} />
                    <Route path="/publicProfile/:userId" element={<PublicProfilePage />} />
                    <Route path="/allUsers" element={<AllUsersPage />} />
                    <Route path="/profile" element={<ActiveProfilePage />} />
                    <Route path="*" element={<Navigate to="/notFound" />} />
                </Routes>
            ) : (
                "loading"
            )}
        </div>
    );
};
export default RequireActiveUserPage;
