var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var idiomas = {
    values: ['esp', 'ing', 'por'],
    message: '{value} no funciona'
}

var excusaSchema = new Schema({
        titulo: { type: String },
        uso: { type: Number },
        descripcion: { type: String },
        likes: { type: Number },
        fecha: { type: Number },
        idioma: { type: String, default: 'esp', enum: idiomas }

    }


    , { collection: 'excusas' });

module.exports = mongoose.model('Excusa', excusaSchema);