import { Routes } from "react-router";
import NavPage from "./NavPage";
import { Route } from "react-router-dom";
import CreateMonthlyRatePage from "./CreateMonthlyRate";
import MonthlyRatesPage from "./MonthlyRates";
import MonthlyDetailsPage from "./MonthDetailsPage";
import CreateWorkDayPage from "./CreateWorkDayPage";

const NstaffMainPage = () => {
    return (
        <div>
            <div>Nstaff</div>
            <Routes>
                <Route path="/nav" element={<NavPage />} />
                <Route path="/monthlyRate/create" element={<CreateMonthlyRatePage />} />
                <Route path="/monthlyRate/all" element={<MonthlyRatesPage />} />
                <Route path="/monthDetails/:month" element={<MonthlyDetailsPage />} />
                <Route path="/workDays/create" element={<CreateWorkDayPage />} />
            </Routes>
        </div>
    );
};
export default NstaffMainPage;
