import Usuario from '../user/user.model.js';
import Class from '../user/user.model.js';
import { hash, verify } from 'argon2';
import { generarJWT} from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const user = await Usuario.findOne({
            $or: [{ email: email?.toLowerCase() }, { name }]
        });

        if (!user || !user.estado) {
            return res.status(400).json({ msg: 'Credenciales incorrectas o usuario inactivo' });
        }

        const validPassword = await verify(user.password, password);
        if (!validPassword) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        const token = await generarJWT(user.id, user.role);

        return res.status(200).json({
            msg: 'Inicio de sesión exitoso',
            userDetails: {
                username: user.username,
                role: user.role,
                token
            }
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: "Error en el servidor",
            error: e.message
        });
    }
};

export const registerStudent = async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;

        const encryptedPassword = await hash (password);

        const user = await Usuario.create({
            name,
            surname,
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: "STUDENT_ROLE",
            })

        return res.status(201).json({
            message: "Student registered successfully",
            userDetails: {
                student: user.name
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Student registration failed",
            error: error.message
        })
    }
}

export const registerTeacher = async (req, res) => {
try {
        const { name, surname, email, password } = req.body;

        const encryptedPassword = await hash (password);

        const user = await Usuario.create({
            name,
            surname,
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: "TEACHER_ROLE"
            })

        return res.status(201).json({
            message: "Teacher registered successfully",
            userDetails: {
                Teacher: user.name
            }
        });

    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            message: "Teacher registration failed",
            error: error.message
        })

    }
}
