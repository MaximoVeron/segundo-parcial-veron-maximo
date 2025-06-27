import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
import router from './routes/pelicula.routes.js'; 
import { initDB } from './config/db.js'; 
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/pelicula", router);

const PORT = process.env.PORT || 4000;

initDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});