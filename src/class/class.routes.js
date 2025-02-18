import {Router} from "express";
import { createClass } from'../class/class.controller.js';
import { validarJWT } from "../middlewares/validar-jwt.js";
const router = Router();

router.post('/', validarJWT, createClass);

export default router;

