import { Request, Response } from "express";
import { SERVER_ERROR, SUCCESS, SUCCESS_DATA, WORK_DAY_EXISTS } from "../../helpers/errors/errorMessages";
import { getSingleMonthlyRate } from "../../services/nstaff/monthlyRate.service";
import { getSingleWorkDay, createWorkDay, getAllWorkDays } from "../../services/nstaff/workDay.service";
import { BAD_REQUEST } from "./../../../../client/src/helpers/errors/errorMessages";
import { MONTHLY_RATE__DOES_NOT_EXISTS } from "./../../helpers/errors/errorMessages";

export async function createWorkDayHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user._id;

        const checkIfMontlyRateExists = await getSingleMonthlyRate({ userId, month: req.body.date.slice(0, 7) });

        if (!checkIfMontlyRateExists) MONTHLY_RATE__DOES_NOT_EXISTS;

        const checkIfExists = await getSingleWorkDay({ userId, month: req.body.date.slice(0, 7), day: req.body.date.slice(-2) });
        if (checkIfExists) return res.send(WORK_DAY_EXISTS);

        const newWorkDay = await createWorkDay({ userId, ...req.body, month: req.body.date.slice(0, 7), day: req.body.date.slice(-2) });
        if (!newWorkDay) throw Error;

        return res.send(SUCCESS);
    } catch (e: unknown) {
        return res.send(SERVER_ERROR);
    }
}
export async function getAllWorkDaysHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user._id;
        const { month } = req.params;

        const workDays = await getAllWorkDays({ userId, month });
        if (!workDays) return BAD_REQUEST;

        return res.send(SUCCESS_DATA(workDays));
    } catch (e: unknown) {
        return res.send(SERVER_ERROR);
    }
}
// export async function updateWorkDayHandler(req: Request, res: Response) {
//     try {
//         const userId = res.locals.user._id;
//         const { workDayId } = req.params;

//         const updatedWorkDay = await updateWorkDayHandler({ userId, _id: workDayId }, req.body);
//         if (!updatedWorkDay) return res.send(BAD_REQUEST);

//         return res.send(SUCCESS_DATA(updatedWorkDay));
//     } catch (e) {
//         return res.send(SERVER_ERROR);
//     }
// }
