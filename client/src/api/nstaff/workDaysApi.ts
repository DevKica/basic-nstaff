import { workDayBody } from "../../types/nstaff";
import { nStaffWorkDaysAccessInstance } from "./nstaffInstance";

export const getAllWorkDays = (month: string | undefined) => nStaffWorkDaysAccessInstance.get(`/getAll/${month}`);

export const getSingleWorkDay = (id: string | undefined) => nStaffWorkDaysAccessInstance.get(`/getOne/${id}`);

export const createWorkDay = (body: workDayBody) => nStaffWorkDaysAccessInstance.post(`/create`, body);

export const updateWorkDay = (body: workDayBody, workDayId: string | undefined) => nStaffWorkDaysAccessInstance.patch(`/update/${workDayId}`, body);

export const deleteWorkDay = (workDayId: string) => nStaffWorkDaysAccessInstance.delete(`/delete/${workDayId}`);
