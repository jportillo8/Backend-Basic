import { validationResult } from "express-validator";

// next es para que continue con el siguiente middleware
const validarCampos = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }
    next()
}

export {validarCampos}