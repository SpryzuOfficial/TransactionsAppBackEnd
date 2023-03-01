const { request, response } = require('express');

const User = require('../models/User');
const { userExists } = require('../helpers/userExists');
const { generateJWT } = require('../helpers/jwt');

const registerUser = async(req = request, res = response) =>
{
    try 
    {
        const { username, email, password } = req.body;
    
        if(await userExists({ email }))
        {
            return res.status(400).json({
                ok: false,
                msg: 'Email already used'
            });
        }
    
        const user = new User({ username, email, password, budget: 0 });

        const token = await generateJWT(user.id, user.username);
    
        await user.save();
    
        res.status(201).json({
            ok: true,
            user,
            token
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

const logInUser = async(req = request, res = response) =>
{
    const { id, email, password } = req.body;

    try
    {
        const user = await userExists({ id, email }, res);
        if(!user) return;

        const isPasswordValid = user.verifyPasswordSync(password);

        if(!isPasswordValid)
        {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid Password'
            });
        }

        const token = await generateJWT(user.id, user.username);

        res.status(200).json({
            ok: true,
            user,
            token
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

const editUser = async(req = request, res = response) =>
{
    try
    {
        const newUser = await User.findByIdAndUpdate(req.uid, { ...req.body }, { new: true });

        const token = await generateJWT(newUser.id, newUser.username);

        res.status(200).json({
            ok: true,
            user: newUser,
            token
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

const renewJWT = async(req = request, res = response) =>
{
    try
    {
        const { uid, username } = req;

        const token = await generateJWT(uid, username);

        res.status(200).json({
            ok: true,
            username,
            uid,
            token
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
    registerUser,
    logInUser,
    editUser,
    renewJWT
}