const { request, response } = require('express');

const Transaction = require('../models/Transaction');
const { userExists } = require('../helpers/userExists');

const setBudget = async(req = request, res = response) =>
{
    const { budget } = req.body;

    try 
    {
        const user = await userExists({ id: req.uid }, res);
        if(!user) return;

        user.budget = budget;

        await user.save();

        res.status(201).json({
            ok: true,
            user
        });
    } 
    catch (error) 
    {
        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const getBudget = async(req = request, res = response) =>
{
    try 
    {
        const user = await userExists({ id: req.uid }, res);
        if(!user) return;

        res.status(201).json({
            ok: true,
            budget: user.budget
        });
    } 
    catch (error) 
    {
        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const getTotalIncome = async(req = request, res = response) =>
{
    try 
    {
        const transactions = await Transaction.find({ user: req.uid, isSpent: false });

        let income = 0;
        transactions.forEach(transaction =>
        {
            income += transaction.amount;
        });

        const user = await userExists({ id: req.uid }, res);
        if(!user) return;

        if(user.budget) income += user.budget;

        res.status(200).json({
            ok: true,
            income
        });
    } 
    catch (error)
    {
        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        }); 
    }
}

const getTotalExpenses = async(req = request, res = response) =>
{
    try 
    {
        const transactions = await Transaction.find({ user: req.uid, isSpent: true });

        let expenses = 0;
        transactions.forEach(transaction =>
        {
            expenses += transaction.amount;
        });

        res.status(200).json({
            ok: true,
            expenses
        });
    } 
    catch (error)
    {
        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        }); 
    }
}

module.exports = {
    setBudget,
    getBudget,
    getTotalIncome,
    getTotalExpenses
}