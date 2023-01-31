import { Role } from "../models/role.js";
import { Usuario } from "../models/usuarios.js";  


const esRoleValido =  async (rol = '') => {
    const existRol = await Role.findOne({ rol })
    if (!existRol) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD`)
    }
}

const emailExiste = async (email = '') => {
    const existeEmail = await Usuario.findOne({ email })
    if (existeEmail) {
        throw new Error(`El correo: ${ email }, ya esta registrado`)
    }
  }

  const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`)
    }
  }

export { esRoleValido, emailExiste, existeUsuarioPorId }