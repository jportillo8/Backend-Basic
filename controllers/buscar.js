import { response } from "express"
import { Usuario } from "../models/usuarios.js"
import { Categoria } from "../models/categoria.js"
import { Producto } from "../models/producto.js"
import { Types } from 'mongoose'

const ObjetID = Types.ObjectId


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {
    // Busqueda de usuarios por nombre o id
    const esMongoID = ObjetID.isValid(termino)// true o false
    if (esMongoID) {
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    // Busqueda por nombre
    // i = insensible a mayusculas y minusculas
    const regex = new RegExp(termino, 'i') // i = insensible a mayusculas y minusculas
    const usuarios = await Usuario.find({
        // Cumple con una de las dos condiciones
        $or: [{ nombre: regex }, { email: regex }],
        $and: [{ estado: true }]
    })

    res.json({
        results: usuarios
    })
}

const buscarCategorias = async (termino = '', res = response) => {

    const esMongoID = ObjetID.isValid(termino)
    if (esMongoID) {
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i') // i = insensible a mayusculas y minusculas
    const categorias = await Categoria.find({
        // Cumple con una de las dos condiciones
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    })
    res.json({
        results: categorias
    })
}

const buscarProductos = async (termino = '', res = response) => {
    
        const esMongoID = ObjetID.isValid(termino)
        if (esMongoID) {
            const producto = await Producto.findById(termino).populate('categoria', 'nombre')
            return res.json({
                results: (producto) ? [producto] : []
            })
        }
    
        const regex = new RegExp(termino, 'i') // i = insensible a mayusculas y minusculas
        const productos = await Producto.find({
            // Cumple con una de las dos condiciones
            $or: [{ nombre: regex }],
            $and: [{ estado: true }]
        }).populate('categoria', 'nombre')
        res.json({
            results: productos
        })
}



const buscar = (req, res=response) => {

    const { coleccion, termino } = req.params

    // si la coleccion no esta en el arreglo de colecciones permitidas
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
        break
        case 'categorias':
            buscarCategorias(termino, res)
        break
        case 'productos':
            buscarProductos(termino, res)
        break
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }
}

export { buscar }