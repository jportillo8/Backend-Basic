import path from 'path'
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.dirname(fileURLToPath(import.meta.url))


const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ''
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    if (!extensionesValidas.includes(extensionArchivo)) {
        return reject(
            `La extension ${extensionArchivo} no es permitida - ${extensionesValidas}`
        )
    }

    // Generar el nombre del archivo con id unico
    const nombreTemp = uuidv4() + "." + extensionArchivo;
    // Path para guardar la imagen
    const uploadPath = path.join(__dirname, "../uploads/",carpeta, nombreTemp);

    // Mover la imagen a la carpeta uploads
    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err)
      }

      // Aqui ya se guardo el archivo
     resolve(nombreTemp)
    })
  })
}

export { subirArchivo };
