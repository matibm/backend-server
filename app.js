// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables 
var app = express();
var cors = require('cors')


// ========================================
//  CORS
// ========================================

//body porser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(), function(req, res, next) {
    res.header("Access-Control-Allow-Origin", ["http://localhost:3000"]); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*"); // "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
// 'mongodb://localhost:27017/portafolio'
// Conexion a la base de datos

// Importar Rutas 
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario')
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');
var busquedaRoutes = require('./routes/busqueda');
var postRoutes = require('./routes/post');
var solicitudRoutes = require('./routes/solicitud');
var configRoutes = require('./routes/config');
var excusaRoutes = require('./routes/excusa');
var generatorRoutes = require('./routes/generator');
var consultaRoutes = require('./routes/consulta');

// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/post', postRoutes);
app.use('/consulta', consultaRoutes);
app.use('/config', configRoutes);
app.use('/excusa', excusaRoutes);
app.use('/html', generatorRoutes);
app.use('/solicitud', solicitudRoutes);

app.use('/', appRoutes);

mongoose.connection.openUri('mongodb+srv://matibm:rb433ah01@cluster0-pywni.mongodb.net/hospitalDB?retryWrites=true&w=majority', (err, res) => {
    if (err) throw err;
    console.log("Base de datos:  \x1b[32m%s\x1b[0m", ' online');
})

// mongoose.connect('  mongodb+srv://matibm:rb433ah01@cluster0-pywni.mongodb.net/test?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     ssl: true,
//     replicaSet: 'Cluster0-shard-0',
//     authSource: 'admin',
//     retryWrites: true
// })

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://matibm:rb433ah01@cluster0-pywni.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     console.log("Base de datos:  \x1b[32m%s\x1b[0m", ' online');
//     // perform actions on the collection object
//     client.close();
// });

// Escuchar peticiones 
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', ' online');
})