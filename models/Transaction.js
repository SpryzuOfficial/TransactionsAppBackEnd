const { Schema, model, Types } = require('mongoose');

const TransactionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {},
    isSpent: {
        type: Boolean,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model('Transaction', TransactionSchema);