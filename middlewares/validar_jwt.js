const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next)  => {

    const token = req.header('x-token');
    if(!token)
    {
        return res.status(401).json({
            'CodError':1, 'DescError': 'No hay un token en la petición.'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();    
    } catch (error) {
        return res.status(401).json({
            'CodError':3, 'DescError': 'Ha ocurrido un error al refrescar el token.'
        });
    }

    

}

module.exports = {
    validarJWT
}