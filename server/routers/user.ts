import { Router } from 'express';
import verifyRole from '../middlewares/roleVerify';
import tokenVerify from '../middlewares/tokenVerify';
import UserController from './../controllers/User';

const router = Router();
const userController = new UserController();

router.get('/:id', tokenVerify, verifyRole("admin"), userController.readOne);
router.post('/', userController.create);
router.put('/:id', tokenVerify, verifyRole("admin"), userController.update);
router.delete('/:id', tokenVerify, verifyRole("admin"), userController.delete);
router.post('/login', userController.login);

export default router;