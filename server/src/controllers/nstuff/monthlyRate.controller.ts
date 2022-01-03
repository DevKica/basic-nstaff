import { Request, Response } from "express";
import { MONTHLY_RATE_EXISTS, SERVER_ERROR, SUCCESS, SUCCESS_DATA } from "../../helpers/errors/errorMessages";
import { getSingleMonthlyRate, createMontlyRate, updateMonthlyRate, getAllMonthlyRates } from "../../services/nstaff/monthlyRate.service";

export async function createMonthlyRateHandler(req: Request, res: Response) {
    try {
        const user = res.locals.user;

        const checkIfExists = await getSingleMonthlyRate({ userId: user.id, month: req.body.month });
        if (checkIfExists) return res.send(MONTHLY_RATE_EXISTS);

        const monthlyRate = await createMontlyRate({ ...req.body, userId: user.id });
        if (!monthlyRate) throw Error;

        return res.send(SUCCESS_DATA(monthlyRate));
    } catch (e: unknown) {
        return res.send(SERVER_ERROR);
    }
}

export async function updateMonthlyRateHandler(req: Request, res: Response) {
    try {
        const user = res.locals.user;
        const newMonthlyRate = await updateMonthlyRate({ userId: user.id, month: req.body.month }, { rate: req.body.rate });
        if (!newMonthlyRate) throw Error;

        return res.send(SUCCESS_DATA(newMonthlyRate));
    } catch (e: unknown) {
        return res.send(SERVER_ERROR);
    }
}

export async function getAllMonthlyRatesHandler(_: Request, res: Response) {
    try {
        const user = res.locals.user;

        const monthlyRates = await getAllMonthlyRates({ userId: user.id });
        if (!monthlyRates) throw Error;

        return res.send(SUCCESS_DATA(monthlyRates));
    } catch (e: unknown) {
        return res.send(SERVER_ERROR);
    }
}

export async function getSingleMonthlyRateHandler(req: Request, res: Response) {
    try {
        const { month } = req.params;
        const userId = res.locals.user.id;

        const monthlyRate = await getSingleMonthlyRate({ userId, month });
        if (!monthlyRate) throw Error;

        return res.send(SUCCESS_DATA(monthlyRate));
    } catch (e: unknown) {
        return res.send(SERVER_ERROR);
    }
}
