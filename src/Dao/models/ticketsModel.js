const  mongoose = requiere( 'mongoose')

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: number,
    purchaser: String
});

module.exports = mongoose.model(ticketCollection, ticketSchema)