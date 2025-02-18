import Class  from '../class/class.model.js';
 
export const createClass = async (req, res) => {
    const { name, description } = req.body;
const teacherId = req.user.id;
 
    try {
        const Class = new Class({ name, description, teacher: teacherId });
        await Class.save();
        res.status(201).json({ message: 'Curso creado exitosamente', course });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
 
