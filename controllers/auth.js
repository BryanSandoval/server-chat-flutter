const {response} = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    try {
        var email = req.body.email;

        const existeEmail = await Usuario.findOne({"email": email});
        if(existeEmail)
        {
            return res.status(400).json({'CodError':1, 'DescError': "Error al crear el usuario, el correo ya existe."})
        }
        const nuevoUsuario = new Usuario(req.body);
        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        nuevoUsuario.contrasenia = bcrypt.hashSync(req.body.contrasenia, salt);
        
        await nuevoUsuario.save();
        /* "nombre": "Bryan Sandoval A.",
        "email": "bchas831@gmail.com",
        "contrasenia": "123456"*/

        const token = await generarJWT(nuevoUsuario.id);
        //console.log("Auth Token: "+token);
        res.json({'CodError':0, 'DescError': "", 'objetoRespuesta':{"usuario":nuevoUsuario, token}});


    } catch (error) {
        res.json({'CodError':2, 'DescError': "Error al crear el usuario."});
    }
}

const loguearUsuario = async (req, res = response) => {

    

    try {
        var email = req.body.email;
        var contrasenia = req.body.contrasenia;

        const existeUsuario = await Usuario.findOne({"email": email});
        if(!existeUsuario)
        {
            return res.status(400).json({
                'CodError':1, 
                'DescError': "Error, creedenciales invalidos..."
            });
        }

        //Validar contraseña
        const validaContra = bcrypt.compareSync(contrasenia, existeUsuario.contrasenia);
        if(!validaContra)
        {
            return res.status(400).json({
                'CodError':2, 
                'DescError': "Error, creedenciales invalidos."
            });
        }

        const token = await generarJWT(existeUsuario.id);
        res.json({'CodError':0, 'DescError': "", 'objetoRespuesta':{"usuario": existeUsuario, token}});

    } catch (error) {
        res.status(500).json({'CodError':3, 'DescError': "Error al loguear el usuario."});
    }

}

const refreshToken = async (req, res = response) => {
    var uid = req.uid;
    if(!uid){
        return res.status(400).json({'CodError':1, 'DescError': "No se encontró el token."});;
    }

    var usuario = await Usuario.findById(uid);
    //console.log("usuario: ",usuario);
    if(!usuario)
    {
        return res.status(400).json({'CodError':2, 'DescError': "No se encontró el usuari con ese id."});;
    }

    try {
        const token = await generarJWT(uid);
        res.json({'CodError':0, 'DescError': "", 'objetoRespuesta':{usuario, "token": token}});

    } catch (error) {
        res.status(500).json({'CodError':3, 'DescError': "Error al generar el nuevo token."});
    }
    
    
}


module.exports = {
    crearUsuario,
    loguearUsuario,
    refreshToken
}