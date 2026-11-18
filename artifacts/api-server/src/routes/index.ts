import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import donationsRouter from "./donations";
import profileRouter from "./student-profile";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(profileRouter);
router.use(donationsRouter);
router.use(storageRouter);

export default router;
