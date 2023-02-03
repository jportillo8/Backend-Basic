import { Role } from "../models/role.js";
import { Usuario } from "../models/usuarios.js";
import { Categoria } from "../models/categoria.js";

const esRoleValido = async (rol = "") => {
  const existRol = await Role.findOne({ rol });
  if (!existRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

const emailExiste = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo: ${email}, ya esta registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    // console.log(existeCategoria);
  if (!existeCategoria) {
    throw new Error(`Este ${id} de categoria no existe`);
  }
};

export { esRoleValido, emailExiste, existeUsuarioPorId, existeCategoriaPorId };
