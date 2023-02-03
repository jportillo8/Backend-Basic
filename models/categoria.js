import { Schema, model } from 'mongoose';
// Proceso inverso primero se crea la coleccion y despues se crea el modelo
// nombre de la coleccion(nombre de archivo sin la s
const CategoriaShema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    // Cuando nesecite saber que usuario creo esa categoria
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
   
})

CategoriaShema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject()
    return data
}

const Categoria = model('Categoria', CategoriaShema)

export { Categoria }
