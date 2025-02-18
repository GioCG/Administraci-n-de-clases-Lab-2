import {Router} from "express";
import { assignCourse } from '../user/user.Controller.js';
import { validarJWT } from "../middlewares/validar-jwt.js"; ;

const router = Router();

router.post('/assign-course', validarJWT, assignCourse);

export default router;