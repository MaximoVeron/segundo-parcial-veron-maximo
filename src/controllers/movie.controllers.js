import { UniqueConstraintError, ValidationError } from "sequelize";
import Movie from "../models/movie.model.js";

// Crear película
export const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            return res.status(400).json({
                message: "El título ya está registrado",
            });
        }
        if (error instanceof ValidationError) {
            const errors = error.errors.map(err => ({
                message: err.message
            }));
            return res.status(400).json({
                message: "Error de validación de datos",
                errors
            });
        }
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

// Obtener todas las películas
export const getAllMovie = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({
            message: "Error del servidor al buscar las películas",
            error: error.message
        });
    }
};

// Obtener película por ID
export const getMovieById = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findByPk(movieId);

        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ message: "Película no encontrada" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

// Actualizar película
export const updateMovie = async (req, res) => {
    const movieId = req.params.id;
    try {
        const movie = await Movie.findByPk(movieId);

        if (!movie) {
            return res.status(404).json({
                message: "Película no encontrada"
            });
        }

        await movie.update(req.body);
        return res.json(movie);
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            return res.status(400).json({
                message: "Ya existe otra película con ese título.",
                details: error.errors.map(e => e.message)
            });
        }
        if (error instanceof ValidationError) {
            const errors = error.errors.map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(400).json({
                message: "Error de datos al actualizar la película.",
                errors: errors
            });
        }
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

// Eliminar película
export const deleteMovie = async (req, res) => {
    const movieId = req.params.id;
    try {
        const movie = await Movie.findByPk(movieId);

        if (!movie) {
            return res.status(404).json({
                message: "No se encontró la película"
            });
        }

        await movie.destroy();
        res.json({
            message: "Película eliminada"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};