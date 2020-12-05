const moongose = require("mongoose");

const dbConnection = async () => {
    try{
        await moongose.connect(process.env.dbUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log("DB Online");

    }
    catch(error)
    {
        console.log(error);
        throw new Error('Error en la BD.')
    }
}

module.exports = {
    dbConnection
};