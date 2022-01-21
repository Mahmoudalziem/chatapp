import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, }).then(res => {
    console.log('mongoDB connected');
}).catch(err => {
    console.log(new Error(err));
});