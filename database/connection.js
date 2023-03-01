const mongoose = require('mongoose');

const connectDB = () =>
{
    try 
    {
        mongoose.set('strictQuery', true);
        
        mongoose.connect(process.env.MONGODB);
        console.log('Connected to Database');
    } 
    catch (error) 
    {
        console.log(error);    
    }
}

module.exports = connectDB;