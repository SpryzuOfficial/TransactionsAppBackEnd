const jwt = require('jsonwebtoken');

const generateJWT = (uid, username) =>
{
    return new Promise((resolve, reject) =>
    {
        const payload = { uid, username };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) =>
        {
            if(error) 
            {
                console.log(error);
                reject('Error generating JWT');
            }

            resolve(token);
        });
    });
}

module.exports = {
    generateJWT
};