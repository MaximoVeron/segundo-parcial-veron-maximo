import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"

const Movie = sequelize.define("Movie", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    director:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    genero:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    duracion:{
        type: DataTypes.INTEGER, // minutos
        allowNull: false,
    },

});

export default Movie;