import { response } from "express";
import { Usuario } from "../models/usuarios.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - email",
      });
    }

    // Verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    // Verificar la contraseña - Es decir si hace match con la que esta en la base de datos
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }
    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    // const googleUser = await googleVerify(id_token);
    // console.log(googleUser);
    const { nombre, img, email } = await googleVerify(id_token)

    // Verificar si el email ya existe en la base de datos
    let usuario = await Usuario.findOne({ email })
    if (!usuario) {
        // Crear usuario
        const data = {
            nombre,
            email,
            // El hashSync es para encriptar la contraseña y que no se vea en la base de datos
            password: ':P',
            img,
            role: 'USER_ROLE',
            google: true
        }
        usuario = new Usuario(data)
        // Guardar en la base de datos
        await usuario.save()
    }
    // Si el usuario en DB tiene estado false
    if (!usuario.estado) {
        return res.status(401).json({
            msg: 'Hable con el administrador, usuario bloqueado'
        })
    }
    // Generar el JWT
    const token = await generarJWT(usuario.id)

    res.json({
        usuario,
        token
    });
  } catch (error) {
    console.log(error)
    res.status(401).json({
      ok: false,
      msg: "Token de Google no es válido",
    });
  }
};

export { login, googleSignIn };
