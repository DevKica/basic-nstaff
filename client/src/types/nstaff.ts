export interface rateBody {
    rate: number;
}

export interface monthlyRateBody extends rateBody {
    month: string;
}

export interface singleMonthlyRate extends monthlyRateBody {
    _id: string;
}

export interface workDayBody {
    date: string;
    startOfWork: string;
    endOfWork: string;
    tipCash: number;
    tipCard: number;
    receipts: number;
}

export interface singleDayProps extends workDayBody {
    _id: string;
    userId: string;
    month: string;
    day: string;
}
