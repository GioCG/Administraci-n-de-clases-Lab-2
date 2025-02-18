import { Router } from "express";
import { registerStudentValidator,registerTeacherValidator, loginValidator } from "../middlewares/validator.js";
import { login,registerStudent,registerTeacher } from "../auth/auth.controller.js";
import {deleteFileOnError} from "../middlewares/delete-file-on-error.js"
import {uploadProfilePicture} from "../middlewares/multer-upload.js"

const router = Router();
 
router.post(
    '/login',
    loginValidator,
    deleteFileOnError,
    login
);
 
router.post(
    '/registerStudent',
    uploadProfilePicture.single("profilePicture"),
    registerStudentValidator,
    deleteFileOnError,
    registerStudent
);

router.post(
    '/registerTeacher',
    uploadProfilePicture.single("profilePicture"),
    registerTeacherValidator,
    deleteFileOnError,
    registerTeacher
);
 
export default router;