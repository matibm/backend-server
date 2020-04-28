var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var consultaSchema = new Schema({
    titulo: { type: String, required: [true, 'El titulo es necesario'] },
    contenido: { type: String, required: [true, 'El titulo es necesario'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },

    fecha: { type: Number, required: true },
    origen: { type: String, required: true },
    destino: { type: String, required: true }

}, { collection: 'consultas' });

module.exports = mongoose.model('Consulta', consultaSchema);