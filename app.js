// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables 
var app = express();



//body porser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 'mongodb://localhost:27017/portafolio'
// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log("Base de datos:  \x1b[32m%s\x1b[0m", ' online');

})


// Importar Rutas 
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario')
var loginRoutes = require('./routes/login');

// Rutas
app.use('/', appRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);





// Escuchar peticiones 
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', ' online');

})