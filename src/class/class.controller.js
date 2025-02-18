import Class from './class.model.js';
import User from "../user/user.model.js";


export const saveClass = async (req, res) => {
    try {
        const data = req.body;
        const authenticatedUser = req.usuario; 

        if (!authenticatedUser || authenticatedUser.role !== "TEACHER_ROLE") {
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para crear un curso"
            });
        }

        const classe = new Class({
            ...data,
            teacher: authenticatedUser._id
        });

        await classe.save();

        res.status(201).json({
            success: true,
            message: "Curso creado exitosamente",
            classe
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error al crear curso",
            error
        });
    }
};


export const listProfesorClass = async (req, res) => {
    try {
        const teacherId = req.usuario._id; 

        const classes = await Class.find({ teacher: teacherId });

        res.json({
            success: true,
            classes,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error al obtener los classes",
        });
    }
};


export const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const teacherId = req.usuario._id;

        const clase = await Class.findOne({ _id: id, teacher: teacherId });

        if (!clase) {
            return res.status(403).json({
                success: false,
                msg: "No puedes eliminar esta clase",
            });
        }

        const students = await User.find({ enrolledClass: id });

        for (const student of students) {
            let newEnrolledClass = [];
            for (let i = 0; i < student.enrolledClass.length; i++) {
                if (student.enrolledClass[i].toString() !== id) {
                    newEnrolledClass.push(student.enrolledClass[i]); 
                }
            }

            await User.updateOne(
                { _id: student._id },
                { enrolledClass: newEnrolledClass },
                { runValidators: false }
            );
        }

        clase.students = [];
        clase.status = false;
        await clase.save();

        res.status(200).json({
            success: true,
            message: "Clase eliminada exitosamente y estudiantes desinscritos",
            clase: clase,
        });
    } catch (error) {
        console.error("Error al eliminar clase:", error);
        res.status(500).json({
            success: false,
            message: "Error al eliminar clase",
            error: error.message,
        });
    }
};

export const editClass = async (req, res) => {
    try {
        const { id } = req.params;
        const teacherId = req.usuario._id;

        const clase = await Class.findOne({ _id: id, teacher: teacherId });

        if (!clase) {
            return res.status(403).json({
                success: false,
                msg: "No puedes editar esta clase",
            });
        }

        const claseActualizada = await Class.findByIdAndUpdate(id, req.body, { new: true });

        res.json({
            success: true,
            msg: "Clase actualizada exitosamente",
            clase: claseActualizada, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error al actualizar la clase",
        });
    }
};

