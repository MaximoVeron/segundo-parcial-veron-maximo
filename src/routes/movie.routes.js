import express from "express";

import {
    createMovie,
    getAllMovie,
    getMovieById,
    updateMovie,
    deleteMovie,
} from "../controllers/movie.controllers.js"

const router = express.Router();

router.post("/", createMovie);
router.get("/", getAllMovie);
router.get("/:id", getMovieById);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;