var express = require('express');

var app = express()

var Solicitud = require('../models/solicitud');

app.get('/', (req, res, next) => {
    console.log("si entro en /solicitud");

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Solicitud.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email img')
        .populate('autor', 'nombre email img')


    .exec((err, solicitud) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error cargando solicitud',
                errors: err
            });
        }

        Solicitud.count({}, (err, conteo) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error contando solicitud',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                solicitud: solicitud,
                matias: conteo
            });
        })
    })
})


app.get('/consulta/:id', (req, res, next) => {

    console.log("de consulta pidio");

    var id = req.params.id;
    // var desde = req.query.desde || 0;

    // desde = Number(desde);
    let solicitudes = []
    Solicitud.find({}).populate('usuario consulta ').where('autor').equals(id)
        .exec((err, solicitud) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error cargando solicitud',
                    errors: err
                });
            } else {

                res.status(200).json({
                    ok: true,
                    solicitud: solicitud
                        //total: conteo
                });
            }

            // Solicitud.count({}, (err, conteo) => {
            //     if (err) {
            //         return res.status(500).json({
            //             ok: false,
            //             mensaje: 'error contando solicitud',
            //             errors: err
            //         });
            //     }

            // })


        })

})

app.get('/post/:id', (req, res, next) => {
    var id = req.params.id;

    console.log("de post pidio");

    // var desde = req.query.desde || 0;

    // desde = Number(desde);
    Solicitud.find({}).populate('usuario post ').where('autor').equals(id)
        .exec((err, solicitud) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error cargando solicitud',
                    errors: err
                });
            } else {

                res.status(200).json({
                    ok: true,
                    solicitud: solicitud
                        //total: conteo
                });
            }


            // Solicitud.count({}, (err, conteo) => {
            //     if (err) {
            //         return res.status(500).json({
            //             ok: false,
            //             mensaje: 'error contando solicitud',
            //             errors: err
            //         });
            //     }

            // })


        })

})

app.get('/enviados/:id', (req, res, next) => {
    var id = req.params.id;

    console.log(id);

    // var desde = req.query.desde || 0;
    // desde = Number(desde);

    Solicitud.find({}).populate('usuario autor post consulta').where('usuario').equals(id)
        .exec((err, solicitud) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error cargando solicitud',
                    errors: err
                });
            } else {

                res.status(200).json({
                    ok: true,


                    solicitud: solicitud
                        //total: conteo
                });
            }

            // Solicitud.count({}, (err, conteo) => {
            //     if (err) {
            //         return res.status(500).json({
            //             ok: false,
            //             mensaje: 'error contando solicitud',
            //             errors: err
            //         });
            //     }

            // })


        })

})



app.post('/', (req, res) => {

    var body = req.body

    var solicitud = new Solicitud({
        usuario: body.usuario,
        consulta: body.consulta,
        post: body.post,
        tipo: body.tipo,
        autor: body.autor
    })

    solicitud.save((err, solicitudGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error guardando solicitud',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            solicitud: solicitudGuardado
        })

    })
})

module.exports = app