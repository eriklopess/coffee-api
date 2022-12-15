import { Router } from "express";
import CoupomController from "../controllers/Coupom";

const router = Router();
const controller = new CoupomController();

router.get("/", controller.read);
router.get("/:id", controller.readOne);
router.post("/", controller.create);
router.delete("/:id", controller.delete);
router.put("/:id", controller.update);

export default router;
