const { request, response } = require('express');

const { userExists } = require('../helpers/userExists');
const Transaction = require('../models/Transaction');

const addTransaction = async(req = request, res = response) =>
{
    const { name, amount, category, isSpent } = req.body;

    try 
    {
        const user = await userExists({ id: req.uid }, res);
        if(!user) return;

        const categoryExists = user.categories.filter(cat => cat.id === category.id);

        if(categoryExists.length < 1)
        {
            return res.status(400).json({
                ok: false,
                msg: 'Category do not exists'
            });
        }

        const transaction = new Transaction({ name, amount, category, isSpent, date: new Date().getTime(), user: req.uid });

        await transaction.save();

        res.status(201).json({
            ok: true,
            transaction
        });
    } 
    catch (error)
    {
        console.log(error);
        
        res.status(500).json({
            ok: true,
            msg: 'Internal Server Error'
        });
    }
}

const getTransactions = async(req = request, res = response) =>
{
    try 
    {
        const transactions = await Transaction.find({ user: req.uid });

        res.status(201).json({
            ok: true,
            transactions
        });
    } 
    catch (error)
    {
        console.log(error);
        
        res.status(500).json({
            ok: true,
            msg: 'Internal Server Error'
        });
    }
}

const deleteTransaction = async(req = request, res = response) =>
{
    const { id } = req.body;

    try 
    {
        await Transaction.findByIdAndDelete(id);

        res.status(201).json({
            ok: true
        });
    } 
    catch (error)
    {
        console.log(error);
        
        res.status(500).json({
            ok: true,
            msg: 'Internal Server Error'
        });
    }
}

module.exports = {
    addTransaction,
    deleteTransaction,
    getTransactions
}