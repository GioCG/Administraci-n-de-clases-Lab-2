import User from '../user/user.model.js';
import Class from "../class/class.model.js"
import { hash, verify } from 'argon2';

export const listEstudianteClass = async (req, res) => {
    try {
        const studentId = req.user._id; 

        const student = await User.findById(studentId).populate("enrolledCourses");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Estudiante no encontrado"
            });
        }

        res.json({
            success: true,
            enrolledCourses: student.enrolledCourses
        });
    } catch (error) {
        console.error("Error al obtener los cursos del estudiante:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los cursos"
        });
    }
};

export const editEstudiante = async (req, res) => {
    try {
        const userId = req.usuario._id;
        const { password, role, enrolledCourses, ...data } = req.body; 


        if (password) {
            data.password = await hash(password);
        }


        const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

        res.status(200).json({
            success: true,
            msg: "Usuario actualizado exitosamente",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar el usuario",
            error
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { _id } = req.usuario; 

        console.log("Intentando desactivar usuario con ID:", _id);

        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado",
            });
        }

        const clases = await Class.find({ _id: { $in: user.enrolledCourses } });

        for (const clas of clases) {
            clases.students = clases.students.filter(studentId => studentId.toString() !== _id.toString());
            await clas.save();
        }

        console.log("Usuario eliminado de los cursos correctamente.");

        user.enrolledCourses = [];

        user.estado = false;
        await user.save();

        res.status(200).json({
            success: true,
            msg: "Usuario desactivado y eliminado de los cursos",
            user
        });

    } catch (error) {
        console.error("Error en deleteUser:", error);

        res.status(500).json({
            success: false,
            msg: "Error al desactivar usuario",
            error: error.message || error
        });
    }
};

export const assignClass = async (req, res) => {
    const { classId } = req.body;
    const studentId = req.user.id;

    try {
        const student = await User.findById(studentId);
        if (student.clases.length >= 3) {
            return res.status(400).json({ error: 'No puedes asignarte a más de 3 cursos' });
        }
        if (student.clases.includes(courseId)) {
            return res.status(400).json({ error: 'Ya estás asignado a este curso' });
        }
        student.clases.push(courseId);
        await student.save();
        res.json({ message: 'Curso asignado exitosamente' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

