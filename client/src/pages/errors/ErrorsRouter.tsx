import { Navigate, Routes } from "react-router";
import { Route } from "react-router-dom";
import NetworkPage from "./Network";
import ForbiddenPage from "./Forbidden";
import ServerErrorPage from "./ServerError";
const ErrorsRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/forbidden" element={<ForbiddenPage />} />
                <Route path="/serverError" element={<ServerErrorPage />} />
                <Route path="/network" element={<NetworkPage />} />
                <Route path="*" element={<Navigate to="/notFound" />} />
            </Routes>
        </div>
    );
};
export default ErrorsRouter;
