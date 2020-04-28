var express = require('express');
var app = express();

var Consulta = require('../models/consulta');

app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Consulta.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email img')
        .exec((err, consulta) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error cargando consulta',
                    errors: err
                });
            }

            Consulta.count({}, (err, conteo) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error contando consulta',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    consulta: consulta,
                    total: conteo
                });
            })
        })
})

app.post('/', (req, res) => {
    console.log("Creando consulta");

    var body = req.body

    var consulta = new Consulta({
        titulo: body.titulo,
        contenido: body.contenido,
        usuario: body.usuario,
        fecha: body.fecha,
        origen: body.origen,
        destino: body.destino,
    })

    consulta.save((err, consultaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error guardando consulta',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            consulta: consultaGuardado
        })

    })
})

module.exports = app;