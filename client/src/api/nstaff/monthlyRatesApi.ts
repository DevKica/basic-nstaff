import { nStaffMonthlyRatesAccessInstance } from "./nstaffInstance";
import { monthlyRateBody, rateBody } from "../../types/nstaff";

export const getSingleMonthlyRate = (month: string | undefined) => nStaffMonthlyRatesAccessInstance.get(`/getOne/${month}`);

export const getAllMonthlyRates = () => nStaffMonthlyRatesAccessInstance.get(`/getAll`);

export const createMonthlyRate = (body: monthlyRateBody) => nStaffMonthlyRatesAccessInstance.post(`/create`, body);

export const updateMonthlyRates = (body: rateBody, monthlyRateId: string) => nStaffMonthlyRatesAccessInstance.patch(`/update/${monthlyRateId}`, body);
