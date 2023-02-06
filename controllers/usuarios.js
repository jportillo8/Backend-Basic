import { response, request } from "express";
import bcryptjs from "bcryptjs";

import { Usuario } from "../models/index.js";

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // const usuarios = await Usuario.find(query)
  //   .limit(Number(limite))
  //   .skip(Number(desde));

  // const total = await Usuario.countDocuments(query);

  const [total , usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
        .limit(Number(limite))
        .skip(Number(desde)),
  ]);

  res.json({
    total,
    usuarios,
  });
};
// 3122524845 clinjer
const usuariosPost = async (req, res) => {
  const { nombre, email, password, role } = req.body;
  // Create a new user
  const usuario = new Usuario({ nombre, email, password, role });

  // Encriptar la contraseña - Numero de vueltas 10
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt); // Encriptar la contraseña en una sola via

  // Save the user in the database
  await usuario.save();

  res.json(usuario)
}

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  // TODO validar contra base de datos
  if (password) {
    // Encriptar la contraseña - Numero de vueltas 10
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  // findByIdAndUpdate - Actualiza el registro y lo retorna
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario
  });
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  // const uid = req.uid;

  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete(id, { estado: false });

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  // const usuarioAutenticado = req.usuario;

  res.json({ usuario});
};

export {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
