import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
dotenv.config();

const app = express();

app.use(express.json());
// app.use("/api/pelicula", router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
