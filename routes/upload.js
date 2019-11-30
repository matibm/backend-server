var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var app = express()
app.use(fileUpload());

var Usuario = require('../models/usuario');
var Medico = require('../models/medico');
var Hospital = require('../models/hospital');

app.put('/:tipo/:id', function(req, res) {
    var tipo = req.params.tipo
    var id = req.params.id

    // tipos de coleccion
    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de coleccion no es valida',
            errors: { message: 'Tipo de coleccion no es valida' }
        });
    }


    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: { message: 'Debe seleccionar un archivo' }
        });
    }

    // Obtener nombre del archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1]

    // solo estas extensiones aceptamos
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg', 'PNG', 'JPG', 'GIF', 'JPEG']

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no valida',
            errors: { message: 'Las extendiones validas son: ' + extensionesValidas.join() }
        });
    }

    // Nombre de archivo personalizado
    var nombreArchivo = `${ id }-${new Date().getMilliseconds() }.${ extensionArchivo}`;

    // Mover el archivo

    var path = `./uploads/${ tipo }/${ nombreArchivo }`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al mover el archivo',
                errors: err
            });
        }
    })

    subirPorTipo(tipo, id, nombreArchivo, res);

    // res.status(200).json({
    //     ok: true,
    //     messaje: 'Peticion realizada correctamente',
    //     nombreCortado: extensionArchivo
    // })
});


function subirPorTipo(tipo, id, nombreArchivo, res) {

    if (tipo === 'usuarios') {
        Usuario.findById(id, (err, usuario) => {
            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Usuario no existe',
                    errors: { message: 'Usuario no existe' }
                });
            }
            var pathViejo = './uploads/usuarios/' + usuario.img;
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }
            usuario.img = nombreArchivo;
            usuario.save((err, usuarioActualizado) => {
                usuarioActualizado.password = ':)'

                if (err) {
                    res.status(500).json({
                        ok: false,
                        message: 'error al guaradar el archivo',
                        errors: err
                    })
                }

                res.status(200).json({
                    ok: true,
                    messaje: 'Imag',
                    nombreCortado: usuarioActualizado
                });
            });
        });
    }
    if (tipo === 'medicos') {

        Medico.findById(id, (err, medicos) => {
            if (!medicos) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Medico no existe',
                    errors: { message: 'Medico no existe' }
                });
            }



            var pathViejo = './uploads/medicos/' + medicos.img;
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }
            medicos.img = nombreArchivo;

            medicos.save((err, medicosActualizado) => {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        message: 'error al guaradar el archivo',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    messaje: 'Imag',
                    nombreCortado: medicosActualizado
                });
            });
        });
    }
    if (tipo === 'hospitales') {
        Hospital.findById(id, (err, hospital) => {
            if (!hospital) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Hospital no existe',
                    errors: { message: 'Hospital no existe' }
                });
            }
            var pathViejo = './uploads/hospitales/' + hospital.img;
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }
            hospital.img = nombreArchivo;

            hospital.save((err, hospitalActualizado) => {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        message: 'error al guaradar el archivo',
                        errors: err
                    })
                }

                res.status(200).json({
                    ok: true,
                    messaje: 'Imag',
                    nombreCortado: hospitalActualizado
                });
            });
        });
    }
}
module.exports = app