import { Router } from "express";
import OrderController from "../controllers/Order";
import tokenVerify from "../middlewares/tokenVerify";

const router = Router();
const controller = new OrderController();

router.get("/", tokenVerify, controller.read);
router.get("/:id", tokenVerify, controller.readOne);
router.post("/", tokenVerify, controller.create);
router.delete("/:id", tokenVerify, controller.delete);
router.put("/checkout/:id", tokenVerify, controller.checkout);

export default router;
