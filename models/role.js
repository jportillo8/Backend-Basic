import { Schema, model } from 'mongoose';
// Proceso inverso primero se crea la coleccion y despues se crea el modelo
// nombre de la coleccion(nombre de archivo sin la s
const RoleSchema = new Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
})

const Role = model('Role', RoleSchema)

export { Role }
