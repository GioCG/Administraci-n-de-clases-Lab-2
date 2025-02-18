import {body} from"express-validator";
import { validarCampos } from "./validar-campos.js";
import { existenteEmail, esRoleValido } from "../helpers/db-validator.js";

export const registerStudentValidator = [
    body("name","The name is required").not().isEmpty(),
    body("email","The email must be valid").isEmail(),
    body("email").custom(existenteEmail),
    body("password", "La contraseña debe tener minimo 8 caracteres").isLength({min: 8}),    
    validarCampos
] ;
export const registerTeacherValidator=[
    body("name","The name is required").not().isEmpty(),
    body("email","The email must be valid").isEmail(),
    body("role").custom(esRoleValido),
    body("email").custom(existenteEmail),
    body("password", "La contraseña debe tener minimo 8 caracteres").isLength({min: 8}),    
    validarCampos
];
export const loginValidator = [
    body("email").optional().isEmail().withMessage("Enter a valid email address"),
    body("name").optional().isString().withMessage("Enter a valid name"),
    body("password", "La contraseña debe tener minimo 8 caracteres").isLength({min: 8}),    
    validarCampos
];


