import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import { Navigate, Routes, useNavigate } from "react-router";
import { Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { stateType } from "../../../redux/reducers/mainReducer";

const PublicMainPage = () => {
    const navigate = useNavigate();
    const [loaded, setIsLoaded] = useState(false);
    const { isAuthenticated } = useSelector((state: stateType) => state.auth);
    useEffect(() => {
        if (isAuthenticated) navigate("/");
        setIsLoaded(true);
    }, [isAuthenticated, navigate]);
    return (
        <div>
            {loaded ? (
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/notFound" />} />
                </Routes>
            ) : (
                "loading"
            )}
        </div>
    );
};
export default PublicMainPage;
