import * as dotenv from "dotenv";
import userRoutes from "../routes/userRoutes.js";

import cors from "cors";
dotenv.config();
import express from "express";
import dbConnection from "../database/config.js";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoute = "/api/v1/users";
        /* Conectar a la base de datos */
        this.connectDb();

        /* Middlewares - Una función que se ejecutan cuando se levante el servidor */
        this.middleware();

        /* Rutas de mi aplicación */

        this.routes(); /* Con esto, se ejecuta el método apenas se instancia un objeto */
    }

    middleware() {
        /* Use es la palabra clave para decir que es un middleware */
        /* Directorio público */
        this.app.use(express.static("public"));
        /* CORS, el POSTMAN se omite el CORS */
        this.app.use(cors());
        /* Lectura y parseo del body */
        this.app.use(
            express.json()
        ); /* Cualquier información que viene, la generaliza en JSON */
    }
    routes() {
        this.app.use(
            this.usersRoute,
            userRoutes
        ); /* Este también es un middleware de express que a todo lo que sea de ese endpoint, usa userRouts.js */
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening in ${this.port}`);
        });
    }

    async connectDb() {
        await dbConnection();
    }
}

export default Server;
