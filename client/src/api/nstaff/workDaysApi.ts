import { rateBody, workDayBody } from "../../types/nstaff";
import { nStaffWorkDaysAccessInstance } from "./nstaffInstance";

export const getAllWorkDays = (month: string | undefined) => nStaffWorkDaysAccessInstance.get(`/getAll/${month}`);

export const createWorkDay = (body: workDayBody) => nStaffWorkDaysAccessInstance.post(`/create`, body);

export const updateWorkDay = (body: rateBody, monthlyRateId: string) => nStaffWorkDaysAccessInstance.patch(`/update/${monthlyRateId}`, body);

export const deleteWorkDay = (workDayId: string) => nStaffWorkDaysAccessInstance.delete(`/delete/${workDayId}`);
