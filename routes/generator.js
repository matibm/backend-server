var express = require('express');

var fs = require('fs');

var mongoose = require('mongoose');

var app = express();

var Schema = mongoose.Schema;

var fileUpload = require('express-fileupload');

app.use(fileUpload());

var Config = require('../models/config');

app.put('/', (req, res) => {

    var data = req.body

    var objeto = new Object({
        marca: String,

    });

    let contenido = `
    <!doctype html>
        <html lang="en">

        <head>
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

            <!-- Bootstrap CSS -->
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

            <title>Hello, world!</title>
        </head>
        <body>${data.contenido}
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    </body>
    
    </html>
    `




    // console.log(data);

    fs.writeFile(`./paginas/${data.nombre}.html`, contenido, 'utf8', (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
        res.status(200).json({
            ok: true,
            message: 'El archivo se subio correctamente'
        })
    })
});


app.get('/', (req, res) => {
    Config.findOne({ 'nombre': 'prueba' }).exec((err, config) => {
        res.status(200).json({
            ok: true,
            config: config
        });
    });
});


app.put('/database', (req, res) => {

    var object = req.body.objeto
    var doc = req.body.doc
    var Schema = mongoose.Schema;
    var model = req.body.model;

    mongoose.connect('mongodb://localhost:27017/univeral', (err) => {
        if (err) throw err;
        console.log("Base de datos:  \x1b[32m%s\x1b[0m", ' online');
    })

    var nombre = 'nombre'
    obbj3 = new Object({
        'nike': 'String',
        'add': 'number'

    })
    var usuarioSchema = new Schema({

        arreglo: object


    });

    function loadModel(modelName, modelSchema) {
        return mongoose.models[modelName] // Check if the model exists
            ?
            mongoose.model(modelName) // If true, only retrieve it
            :
            mongoose.model(modelName, modelSchema) // If false, define it
    }

    var watever = loadModel(model, usuarioSchema);
    //mongoose.model(model) || mongoose.model(model, usuarioSchema);


    obbj = new Object({
        'marca': 'nike',
        'cantidad': '32',
        'color': 'blanco'

    })

    obj = new watever({
        arreglo: doc

    })

    obj.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error cargand o usuarios',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            Usuarios: usuarioGuardado,
            usuarioToken: req.usuario
        })

    })

    console.log("se creo correctamente");

})




module.exports = app