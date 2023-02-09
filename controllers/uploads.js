import * as dotenv from 'dotenv';
dotenv.config();

import v2 from "cloudinary"

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import { response } from "express";
import { subirArchivo } from "../helpers/index.js";

import { Producto, Usuario  } from "../models/index.js";

const cloudinary = v2
cloudinary.config({
    cloud_name:'picasso3-1415',
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const cargarArchivo = async (req, res = response) => {
  // Si en la req no hay archivos, entonces:
  // Nestro el nombre del archivo

  // console.log(req.files)
  // console.log(req.files.archivo)
  // console.log(Object.keys(req.files).length)
  // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
  //   res.status(400).json({ msg: "No hay archivos" });
  //   return;
  // }
  // Intentar subir el archivo y si no se puede, entonces: mandar un error
  try {
    // Procesar la imagen
    // const nombre = await subirArchivo(req.files, ["txt", "md"], "textos");
    const nombre = await subirArchivo(req.files, undefined, "imgs");
    res.json({ nombre });
  } catch (msg) {
    res.status(400).json({ msg });
  } 
}

const actualizarImagen = async (req, res = response) => {

  const { id, coleccion } = req.params

  let modelo

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un usuario con el id ${id}` })
      }
      break

    case 'productos':
      modelo = await Producto.findById(id)
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un producto con el id ${id}` })
      }

      break

      default:
        return res.status(500).json({ msg: 'Se me olvidó validar esto' })
  }

  // Limpiar imágenes previas
  if(modelo.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen =  path.join(__dirname, '../uploads/',coleccion, modelo.img );
    // const uploadPath = path.join(__dirname, "../uploads/",carpeta, nombreTemp);
    if (fs.existsSync(pathImagen)) {
      // Borrar la imagen
      console.log('Imagen encontrada, borrando...')
      fs.unlinkSync(pathImagen)
    }
  }


  // Subir la imagen al servidor
  const nombreArchivo = await subirArchivo(req.files, undefined, coleccion)
  modelo.img = nombreArchivo
  await modelo.save()
  res.json(modelo)
}

const mostrarImagen = async (req, res = response) => {

  const { id, coleccion } = req.params
  let modelo

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un usuario con el id ${id}` })
      }
      break

    case 'productos':
      modelo = await Producto.findById(id)
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un producto con el id ${id}` })
      }
      break

      default:
        return res.status(500).json({ msg: 'Se me olvidó validar esto' })
  }

  // Limpiar imágenes previas
  if(modelo.img) {
    const pathImagen =  path.join(__dirname, '../uploads/',coleccion, modelo.img );
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen)
    }
  }

  const pathNoImagen =  path.join(__dirname, '../assets/no-image.jpg' );
  res.sendFile(pathNoImagen)


}

const actualizarImagenCloudinary = async (req, res = response) => {

  const { id, coleccion } = req.params

  let modelo

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un usuario con el id ${id}` })
      }
      break

    case 'productos':
      modelo = await Producto.findById(id)
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un producto con el id ${id}` })
      }

      break

      default:
        return res.status(500).json({ msg: 'Se me olvidó validar esto' })
  }

  // Limpiar imágenes previas
  if(modelo.img) {
    const nombreArr = modelo.img.split('/')
    const nombre = nombreArr[nombreArr.length - 1]
    const [ public_id ] = nombre.split('.')
    cloudinary.uploader.destroy(public_id)
  }
  console.log(req.files.archivo)
  const { tempFilePath } = req.files.archivo
  const { secure_url  } = await cloudinary.uploader.upload(tempFilePath)
  modelo.img = secure_url
  await modelo.save()

  res.json(modelo)
}

export { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary };
