import { Navigate, Routes } from "react-router";
import NavPage from "./NavPage";
import { Route } from "react-router-dom";
import CreateMonthlyRatePage from "./CreateMonthlyRate";
import MonthlyRatesPage from "./MonthlyRates";
import MonthlyDetailsPage from "./MonthDetailsPage";
import CreateWorkDayPage from "./CreateWorkDayPage";
import SingleWorkDayDetailPage from "./SingleWorkDayPage";

const NstaffMainPage = () => {
    return (
        <div>
            <div>Nstaff</div>
            <Routes>
                <Route path="/nav" element={<NavPage />} />
                <Route path="/monthlyRate/create" element={<CreateMonthlyRatePage />} />
                <Route path="/monthlyRate/all" element={<MonthlyRatesPage />} />
                <Route path="/monthDetails/:month" element={<MonthlyDetailsPage />} />
                <Route path="/singleWorkDay/:id" element={<SingleWorkDayDetailPage />} />
                <Route path="/workDays/create" element={<CreateWorkDayPage />} />
                <Route path="*" element={<Navigate to="/notFound" />} />
            </Routes>
        </div>
    );
};
export default NstaffMainPage;
