/*
    Llamado api: api/login
*/
const {Router} = require('express');
const {check} = require("express-validator");

const { crearUsuario, loguearUsuario, refreshToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');

const router = Router();

router.post('/servicioDisponible', (req, res = response) =>{
    //res.json();
    res.json({'CodError':0, 'DescError': "", 'objetoRespuesta':{'servicioDisponible':true}});
});


router.post('/new', [check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('email', 'El email es obligatorio').isEmail(),
check('contrasenia', 'La contrasenia es obligatoria').not().isEmpty(),
validarCampos], crearUsuario);

router.post('/login', [check('email', 'El email es obligatorio').isEmail(),
check('contrasenia', 'La contrasenia es obligatoria').not().isEmpty(),
validarCampos], loguearUsuario);

router.get('/refreshToken',validarJWT, refreshToken);

module.exports = router;