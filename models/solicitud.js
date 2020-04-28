var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tipoSolicitud = {
    values: ['CONSULTA', 'POST', ],
    message: '{value} no es un tipo de solicitud permitido'
}

var solicitudSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    consulta: { type: Schema.Types.ObjectId, required: false, ref: 'Consulta' },
    post: { type: Schema.Types.ObjectId, required: false, ref: 'Post' },
    tipo: { type: String, required: true, enum: tipoSolicitud },
    autor: { type: Schema.Types.ObjectId, ref: 'Usuario' },

}, { collection: 'solicitudes' });

module.exports = mongoose.model('Solicitud', solicitudSchema);