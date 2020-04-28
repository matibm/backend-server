var express = require('express');

var app = express()

var Excusa = require('../models/excusa');


app.get('/', (req, res, next) => {
    Excusa.find({}).exec((err, excusas) => {
        let size = excusas.length;

        let excusa;
        let indice;
        indice = Math.floor(Math.random() * size);
        console.log(indice);

        res.status(200).json({
            ok: true,
            excusa: excusas[indice]
        })
    })
})

module.exports = app