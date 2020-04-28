var express = require('express');

var app = express();
var Config = require('../models/config');

app.post('/', (req, res) => {

})

app.get('/', (req, res) => {
    Config.findOne({ 'nombre': 'prueba' }).exec((err, config) => {
        res.status(200).json({
            ok: true,
            config: config
        })
    })
})

app.put('/:id', (req, res) => {
    var id = req.params.id
    console.log("llego al put");

    var config = req.body
    Config.findOneAndUpdate(id, {
        $set: {
            nombre: config.nombre,
            contenido: config.contenido
        }
    }, (err, config) => {
        if (err) {
            console.log("error");

            return res.status(500).json({
                ok: false,
                errors: err
            })
        }
        return res.status(200).json({
            ok: true,
            config: config,
            message: 'config actualizada correctamente'
        })
    })
})


module.exports = app;