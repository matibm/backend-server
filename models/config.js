var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')

var Schema = mongoose.Schema;



var usuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    contenido: { type: String }

}, { collection: 'configs' });


module.exports = mongoose.model('Config', usuarioSchema);