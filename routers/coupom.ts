import { Router } from "express";
import CoupomController from "../controllers/Coupom";
import verifyRole from "../middlewares/roleVerify";
import tokenVerify from "../middlewares/tokenVerify";

const router = Router();
const controller = new CoupomController();

router.get("/", tokenVerify, controller.read);
router.get("/:id", tokenVerify, controller.readOne);
router.post("/", tokenVerify, verifyRole('admin'), controller.create);
router.delete("/:id", tokenVerify, verifyRole('admin'), controller.delete);
router.put("/:id", tokenVerify, verifyRole('admin'), controller.update);

export default router;
