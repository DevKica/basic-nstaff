import workDayModel, { workDayInput, workDayFilter, workDayUpdate } from "../../models/nstaff/workDay.model";

export async function createWorkDay(input: workDayInput) {
    try {
        const workDay = workDayModel.create(input);
        return workDay;
    } catch (e) {
        return null;
    }
}

export async function getSingleWorkDay(query: workDayFilter) {
    try {
        const workDay = workDayModel.findOne(query);
        return workDay;
    } catch (e) {
        return null;
    }
}

export async function getAllWorkDays(query: workDayFilter) {
    try {
        const workDays = workDayModel.find(query).sort({ day: -1 });
        return workDays;
    } catch (e) {
        return null;
    }
}

export async function updateWorkDay(query: workDayFilter, update: workDayUpdate) {
    try {
        const newWorkDay = workDayModel.findOneAndUpdate(query, update, { new: true }).lean();
        return newWorkDay;
    } catch (e) {
        return null;
    }
}

export async function deleteSingleWorkDay(query: workDayFilter) {
    try {
        const deleteStatus = workDayModel.deleteOne(query);
        return deleteStatus;
    } catch (e) {
        return null;
    }
}
