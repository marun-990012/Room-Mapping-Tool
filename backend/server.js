import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db-connection/db.js';
import mediaRoute from './config/routes/mediaRoutes.js';
import userRoute from './config/routes/userRoutes.js';
import roomRoutes from './config/routes/roomRoutes.js';

dotenv.config({ debug: true, override: true });
const app = express();
const PORT = process.env.PORT ;

app.use(cors());
app.use(express.json());

//APIs
app.use('/api',userRoute);
app.use('/api',mediaRoute);
app.use('/api',roomRoutes);

app.listen(PORT,()=>{
    connectDB();
    console.log('server connected to port',PORT);
});