import { Router } from "express";
import OrderController from "../controllers/Order";
import verifyRole from "../middlewares/roleVerify";
import tokenVerify from "../middlewares/tokenVerify";

const router = Router();
const controller = new OrderController();

router.get("/", tokenVerify, controller.read);
router.get("/:id", tokenVerify, controller.readOne);
router.post("/", tokenVerify, controller.create);
router.delete("/:id", tokenVerify, verifyRole("admin"), controller.delete);
router.put("/checkout/:id", tokenVerify, controller.checkout);

export default router;
