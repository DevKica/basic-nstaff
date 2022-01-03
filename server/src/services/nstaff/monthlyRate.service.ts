import MontlyRateModel, { montlyRateInput, monthlyRateFilter } from "../../models/nstaff/monthlyRate";

export async function createMontlyRate(input: montlyRateInput) {
    try {
        const monthlyRate = MontlyRateModel.create(input);
        return monthlyRate;
    } catch (e: unknown) {
        return null;
    }
}
export async function updateMonthlyRate(query: monthlyRateFilter, update: monthlyRateFilter) {
    try {
        const newMonthlyRate = MontlyRateModel.findOneAndUpdate(query, update, { new: true }).lean();
        return newMonthlyRate;
    } catch (e: unknown) {
        return null;
    }
}

export async function getAllMonthlyRates(query: monthlyRateFilter) {
    try {
        const monthlyRates = MontlyRateModel.find(query, "month rate");
        return monthlyRates;
    } catch (e: unknown) {
        return null;
    }
}
export async function getSingleMonthlyRate(query: monthlyRateFilter) {
    try {
        const monthlyRate = MontlyRateModel.findOne(query);
        return monthlyRate;
    } catch (e: unknown) {
        return null;
    }
}
