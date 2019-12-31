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


module.exports = app;