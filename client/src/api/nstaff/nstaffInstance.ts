import axios from "axios";
import { MONTHLY_RATES_URL, WORK_DAYS_URL } from "../../config/default";
import { networkError, basicAndForbiddenErrors } from "../user/userInstance";

export const nStaffMonthlyRatesAccessInstance = axios.create({
    baseURL: MONTHLY_RATES_URL,
});

export const nStaffWorkDaysAccessInstance = axios.create({
    baseURL: WORK_DAYS_URL,
});

nStaffMonthlyRatesAccessInstance.interceptors.response.use((res) => basicAndForbiddenErrors(res), networkError);

nStaffWorkDaysAccessInstance.interceptors.response.use((res) => basicAndForbiddenErrors(res), networkError);
