
const {response} = require('express');

const Mensaje = require("../models/mensaje");

const obtenerChat = async (req, res = response) => {
    const miId = req.uid;
    const mensajesDe = req.params.de; //persona de la cual se abre el chat. Yo abro el Mila (Mila = mensajeDe)-
    //console.log("miId: ", miId);
    //console.log("mensajesDe: ", mensajesDe);
    const last30 = await Mensaje.find({
        $or: [{de: miId, para:mensajesDe}, {de: mensajesDe, para: miId}]
    }).sort({
        createdAt: 'desc'
    }).limit(30);
    //const last30 = await Mensaje.find({'de': mensajesDe});
    res.json(
        {"codError": 0, "descError": "", "objetoRespuesta": {"mensajes": last30}}
    );


}

module.exports = {
    obtenerChat
}