import User from '../user/user.model.js';

export const assignCourse = async (req, res) => {
    const { courseId } = req.body;
    const studentId = req.user.id;

    try {
        const student = await User.findById(studentId);
        if (student.courses.length >= 3) {
            return res.status(400).json({ error: 'No puedes asignarte a más de 3 cursos' });
        }
        if (student.courses.includes(courseId)) {
            return res.status(400).json({ error: 'Ya estás asignado a este curso' });
        }
        student.courses.push(courseId);
        await student.save();
        res.json({ message: 'Curso asignado exitosamente' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

