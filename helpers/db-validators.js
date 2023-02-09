import { Role } from "../models/role.js";
import { Usuario } from "../models/usuarios.js";
import { Categoria } from "../models/categoria.js";
import { Producto } from "../models/producto.js";

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

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);
  // console.log(existeCategoria);
if (!existeProducto) {
  throw new Error(`Este ${id} de producto no existe`);
 }
}
// Validar colecciones permitidas
const coleccionesPermitidas = ( coleccion = '' , colecciones = []) => {
  const incluida = colecciones.includes( coleccion );
  if ( !incluida ) {
    throw new Error( `La coleccion ${ coleccion } no es permitida - ${ colecciones }` );
  }
  return true;
}

export { esRoleValido, emailExiste, existeUsuarioPorId, existeCategoriaPorId, existeProductoPorId, coleccionesPermitidas };
