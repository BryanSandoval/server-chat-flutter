const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
    return new Promise( (resolve, reject) => {
        const payload = {
            uid
        };
    
        jwt.sign(payload, process.env.JWT_KEY,{
            expiresIn: '24h'
        },(err, token) => {
            //console.log("TOKEN: "+token);
            if (err){
                reject("No se pudo generar el JWT: "+err);
            }
            else{
                resolve(token);
            }
        });
    });
}

const validarJWT = (token = '') => {
    try {
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        //req.uid = uid;
        return [true, uid];
        //next();    
    } catch (error) {
        return [false, null];
    }
}

module.exports = {
    generarJWT,
    validarJWT
}