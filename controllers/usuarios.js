const {response} = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");

const Usuario = require('../models/usuario');
//const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res = response) => {
    //console.log("req.uid: ", req.uid);

    const desde = Number(req.query.desde) || 0;

    const usuarios = await Usuario
    .find({_id: {$ne: req.uid}})
    .sort("-online")
    .skip(desde)
    .limit(20);
    res.json({"codError": 0, "descError": "", "objetoRespuesta": {"usuarios": usuarios}});
    //{_id: {$ne: req.uid}}
}

module.exports = {
    getUsuarios
}