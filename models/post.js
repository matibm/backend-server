var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    titulo: { type: String, required: [true, 'El titulo es necesario'] },
    contenido: { type: String, required: [true, 'El titulo es necesario'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    auto: { type: String, required: false },
    fecha: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    origen: { type: String, required: true },
    destino: { type: String, required: true }



}, { collection: 'posts' });

module.exports = mongoose.model('Post', postSchema);