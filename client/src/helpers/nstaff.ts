import { cardTipTax, taxToKitchen } from "../constants/taxes";
import { calculateEarningsType } from "../types/nstaff";
import { hourDiff } from "./hourDiff";

export const calculateDayEarnings = (data: calculateEarningsType, rate: number) => {
    return Math.round((rate * hourDiff(data.startOfWork, data.endOfWork) + data.tipCard * cardTipTax + data.tipCash - data.receipts * taxToKitchen) * 100) / 100;
};
