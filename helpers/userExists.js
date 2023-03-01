const User = require('../models/User');

const userExists = async({ id, email }, res) =>
{
    const user = await User.findOne({$or: [{ _id: id }, { email }]});

    if(!user && res) // If res is provided, then, it will print out the message
    {
        res.status(400).json({
            ok: false,
            msg: 'User not found'
        });
    }

    return user;
}

module.exports = {
    userExists
};