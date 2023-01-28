// {
//     "nombre": "string",
//     "email": "string",
//     "password": "string",
//     "img": "string",
//     "role": "string",
//     "estado": "boolean",
//     "google": "boolean"
// }

import { Schema, model } from 'mongoose';

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        // default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

const Usuario = model('Usuario', UsuarioSchema);

export { Usuario }