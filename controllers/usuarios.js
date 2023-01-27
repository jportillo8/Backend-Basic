import { response, request } from "express";

const usuariosGet = (req = request, res = response) => {

  const { q, nombre='No name', apikey, page = 1, limit  } = req.query;

  res.json({
    ok: true,
    msg: "get API - controlador ",
    q,
    nombre,
    apikey,
    page,
    limit
  });
};

const usuariosPost = (req, res) => {

  const { name, age } = req.body;
  res.json({
    ok: true,
    msg: "post API- controlador",
    name,
    age,
  });
};

const usuariosPut = (req, res) => {
  const { id } = req.params
  res.json({
    ok: true,
    msg: "put API- controlador",
    id
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    ok: true,
    msg: "patch API- controlador",
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    ok: true,
    msg: "delete API- controlador",
  });
};

export {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
};
