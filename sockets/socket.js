const { io } = require('../index');
const {validarJWT} = require('../helpers/jwt');
const usuario = require('../models/usuario');
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {

    var tokenCliente = client.handshake.headers["x-token"];
    const [valido, uid] = validarJWT(tokenCliente);
    if(!valido)
    {
        return client.disconnect();
    }

    usuarioConectado(uid);
    console.log('Cliente conectado, uid: ',uid  );
    
    //sala global io.emit
    //sala personal client.emit -- client.id client.to(uid).emit();
    client.join(uid);

    client.on('mensaje-personal', async (payload) =>{
        const valido = await grabarMensaje(payload);
        if(valido)
        {
            //console.log('payload para: ', payload.para  ); 
            io.to(payload.para).emit('mensaje-personal', payload);
        }
        
        
    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });
});
