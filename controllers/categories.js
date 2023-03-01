const { request, response } = require('express');

const { v4: uuid } = require('uuid');

const { userExists } = require('../helpers/userExists');

const addCategory = async(req = request, res = response) =>
{
    const { name } = req.body;

    try 
    {
        const user = await userExists({ id: req.uid }, res);
        if(!user) return;

        const id = uuid();
        const category = { id, name };
        
        user.categories.push(category);


        await user.save();

        res.status(201).json({
            ok: true,
            user,
            category
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

const editCategory = async(req = request, res = response) =>
{
    const { id, name } = req.body;

    try 
    {
        const user = await userExists({ id: req.uid }, res);
        if(!user) return;

        user.categories = user.categories.filter(category => category.id !== id);

        user.categories.push({ id, name });

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

const deleteCategory = async(req = request, res = response) =>
{
    const { id } = req.body;

    try 
    {
        const user = await userExists({ id: req.uid }, res);
        if(!user) return;

        user.categories = user.categories.filter(category => category.id !== id);

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

const getCategories = async(req = request, res = response) =>
{
    const { uid } = req;

    try 
    {
        const user = await userExists({ id: uid }, res);
        if(!user) return;

        res.status(200).json({
            ok: true,
            categories: user.categories
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
    addCategory,
    editCategory,
    deleteCategory,
    getCategories
}