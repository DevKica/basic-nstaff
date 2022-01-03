import { Router } from "express";
import { getSingleMonthlyRateHandler, getAllMonthlyRatesHandler, createMonthlyRateHandler, updateMonthlyRateHandler } from "../../controllers/nstuff/monthlyRate.controller";
import { basicSchemaValidation } from "../../middlewares/basicValidation";
import { requireActiveUser } from "../../middlewares/requireUser";
import { monthlyRateSchema } from "../../schemas/nstuff/monthlyRateSchema";

const router = Router();

router.get("/getOne/:month", requireActiveUser, getSingleMonthlyRateHandler);
router.get("/getAll", requireActiveUser, getAllMonthlyRatesHandler);
router.post("/create", [requireActiveUser, basicSchemaValidation(monthlyRateSchema)], createMonthlyRateHandler);
router.patch("/update", [requireActiveUser, basicSchemaValidation(monthlyRateSchema)], updateMonthlyRateHandler);

export default router;
