import { Router } from "express";
import { createWorkDayHandler, deleteWorkDayHandler, getAllWorkDaysHandler, updateWorkDayHandler } from "../../controllers/nstuff/workDay.controller";
import { basicSchemaValidation } from "../../middlewares/basicValidation";
import { requireActiveUser } from "../../middlewares/requireUser";
import { workDaySchema } from "../../schemas/nstuff/workDaySchema";

const router = Router();

router.get("/getAll/:month", requireActiveUser, getAllWorkDaysHandler);
router.post("/create", [requireActiveUser, basicSchemaValidation(workDaySchema)], createWorkDayHandler);
router.patch("/update/:workDayId", [requireActiveUser, basicSchemaValidation(workDaySchema)], updateWorkDayHandler);
router.delete("/delete/:workDayId", requireActiveUser, deleteWorkDayHandler);

export default router;
