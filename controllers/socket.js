const usuario = require("../models/usuario");
const Mensaje = require("../models/mensaje");

const usuarioConectado = async (uid = '') => {
    const usuarioConectado = await usuario.findById(uid);
    usuarioConectado.online = true;
    await usuarioConectado.save();
    return usuarioConectado;
}

const usuarioDesconectado = async (uid = '') => {
    const usuarioConectado = await usuario.findById(uid);
    usuarioConectado.online = false;
    await usuarioConectado.save();
    return usuarioConectado;
}

const grabarMensaje  = async (payload) => {

    /*
        de: '',
        para: '',
        mensaje: ''
    */

    try {
        const mensaje = new Mensaje(payload);
        await mensaje.save();
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}