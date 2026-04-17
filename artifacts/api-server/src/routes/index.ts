import { Router, type IRouter } from "express";
import healthRouter from "./health";
import categoriesRouter from "./categories";
import productsRouter from "./products";
import newsRouter from "./news";
import mediaRouter from "./media";
import contactRouter from "./contact";
import statsRouter from "./stats";
import uploadRouter from "./upload";

const router: IRouter = Router();

router.use(healthRouter);
router.use(uploadRouter);
router.use(categoriesRouter);
router.use(productsRouter);
router.use(newsRouter);
router.use(mediaRouter);
router.use(contactRouter);
router.use(statsRouter);

export default router;
