import { Router } from "express";
import { check , body} from "express-validator";
import { listProfesorClass, saveClass, deleteClass, editClass } from "../class/class.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existeClassById } from "../helpers/db-validator.js";
import { tieneRole } from "../middlewares/validar-roles.js";



const router = Router();

router.post(
    "/",
    [
        validarJWT, 
        tieneRole("TEACHER_ROLE"),
        validarCampos
    ],
    saveClass
);


router.get("/",
     [
        validarJWT,
        tieneRole("TEACHER_ROLE"),
      ],
      listProfesorClass
);



router.delete(
    "/:id",
    [
        validarJWT, 
        tieneRole("TEACHER_ROLE"), 
        check("id").custom(existeClassById),
        validarCampos
    ],
    deleteClass
);

router.put(
    "/:id",
    [
        validarJWT, 
        tieneRole("TEACHER_ROLE"),
        check("id").custom(existeClassById),
        validarCampos
    ],
    editClass
);

export default router;
