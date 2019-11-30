var express = require('express');

var app = express()
var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Usuario = require('../models/usuario');


//	========================================
//  Busqueda por coleccion
//	========================================
app.get('/coleccion/:tabla/:busqueda', (req, res, next) => {
    var tabla = req.params.tabla;
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i')

    if (tabla == 'medico') {
        Promise.all([buscarMedicos(busqueda, regex)]).then(respuestas => {
            res.status(200).json({
                ok: true,
                medicos: respuestas[0]
            });
        });
    } else if (tabla == 'hospital') {
        Promise.all([buscarHospitales(busqueda, regex)]).then(respuestas => {
            res.status(200).json({
                ok: true,
                hospitales: respuestas[0]
            });
        });
    } else if (tabla == 'usuario') {
        Promise.all([buscarUsuarios(busqueda, regex)]).then(respuestas => {
            res.status(200).json({
                ok: true,
                usuarios: respuestas[0]
            });
        });
    } else {
        res.status(400).json({
            ok: false,
            mensaje: 'Los tipos de busqueda solo son: usuarios, medicos y hospitales',
            error: { message: 'Tipo de tabla/coleccion no valido' }
        })
    }

})

app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all(
        [
            buscarHospitales(busqueda, regex),
            buscarMedicos(busqueda, regex),
            buscarUsuarios(busqueda, regex)
        ]
    ).then(respuestas => {
        res.status(200).json({
            ok: true,
            hospitales: respuestas[0],
            medicos: respuestas[1],
            usuarios: respuestas[2]
        });
    });

});

function buscarHospitales(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Hospital.find({ nombre: regex }).populate('usuario', 'nombre email').exec((err, hospitales) => {
            if (err) {
                reject('Error al cargar Hospitales', err)
            } else {
                resolve(hospitales)
            }
        })
    })
}

//	========================================
//  Buscar Medicos
//	========================================
function buscarMedicos(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Medico.find({ nombre: regex })
            .populate('usuario', 'nombre email')
            .populate('hospital')
            .exec((err, medicos) => {
                if (err) {
                    reject('Error al cargar medicos', err)
                } else {
                    resolve(medicos)
                }
            })
    })
}

function buscarUsuarios(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Usuario.find({}, 'nombre email role').or([{ 'nombre': regex }, { 'email': regex }]).exec((err, usuario) => {
            if (err) {
                reject('Error al cargar usuarios', err)
            } else {
                resolve(usuario)
            }
        })
    })
}



module.exports = app