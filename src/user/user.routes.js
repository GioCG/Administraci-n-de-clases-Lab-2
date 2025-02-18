import {Router} from "express";
import { validarJWT } from "../middlewares/validar-jwt.js"; ;
import { validarCampos } from "../middlewares/validar-campos.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { noDuplicarCurso,noCursosDuplicados } from "../middlewares/validation-mismos-cursos.js";
import { listEstudianteClass,editEstudiante, deleteUser,assignClass } from "../user/user.controller.js";

const router = Router();

router.post('/assign-class', validarJWT, assignClass);

router.get(
    "/mis-cursos", 
    [
        validarJWT, 
        tieneRole("STUDENT_ROLE"),
        validarCampos
    ], 
    listEstudianteClass
);

router.put(
    "/editar", 
    [
        validarJWT, 
        tieneRole("STUDENT_ROLE"),
        validarCampos
    ], 
    editEstudiante
);



router.delete(
    "/eliminar",
    [
        validarJWT
    ], 
    deleteUser
);
export default router;