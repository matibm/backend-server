var express = require('express');
var app = express();

var Post = require('../models/post');

app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Post.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email img')
        .exec((err, post) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error cargando posts',
                    errors: err
                });
            }

            Post.count({}, (err, conteo) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error contando posts',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    posts: post,
                    total: conteo
                });
            })
        })
})


app.post('/', (req, res, next) => {
    var data = req.body
    console.log(data)
    var post = new Post({
        titulo: data.titulo,
        origen: data.origen,
        destino: data.destino,
        contenido: data.contenido,
        usuario: data.usuario,
        auto: data.auto,
        fecha: data.fecha,
        cantidad: data.cantidad,

    })

    post.save((err, postGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error creando post',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            post: postGuardado,
            message: 'post creado correctamente'
        })
    })
})

module.exports = app;