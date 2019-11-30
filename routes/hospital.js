var express = require('express');
var app = express();

var Hospital = require('../models/hospital');
var mdAutenticacion = require('../middleware/autenticacion');

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Hospital.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .exec((err, hospital) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error cargando hospitales',
                    errors: err
                });
            }

            Hospital.count({}, (err, conteo) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error contando hospitales',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    hospitales: hospital,
                    total: conteo
                });
            })

        });
});

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    Hospital.findById(id, (err, hospital) => {
        var body = req.body

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar hospital',
                errors: err
            });
        }
        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital con el' + id + 'no existe',
                errors: { message: 'No existe un hospital con ese ID' }
            });
        }
        hospital.nombre = body.nombre;
        hospital.usuario = req.usuario.id
        hospital.save((err, hospitalGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar hospital',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                Hospital: hospitalGuardado
            });
        })
    })
})

app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body
    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: req.usuario._id
    });
    hospital.save((err, hospitalGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error cargando hospital',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            Hospital: hospitalGuardado,
            usuarioToken: req.usuario
        })
    });
});

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar usuario',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            hospital: hospitalBorrado
        })
        if (!hospitalBorrado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No existe un hospital con ese id',
                errors: "no existe el hospital para borrar"
            });
        }
    })
})


module.exports = app;