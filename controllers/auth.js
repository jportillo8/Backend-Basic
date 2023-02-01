import { response } from "express";
import { Usuario } from "../models/usuarios.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt.js";


const login = async (req, res = response) => {

    const { email, password } = req.body

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            })
        }

        // Verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        // Verificar la contraseña - Es decir si hace match con la que esta en la base de datos
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id)


        res.json({
            usuario,
            token
        })     
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


   
}

export { login }