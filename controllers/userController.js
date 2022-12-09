import "colors";
import bcrypt from "bcryptjs";
import { response } from "express";
import User from "../models/user.js";
const userGet = async (req, res = response) => {
    /* Se recomienda desestructurar solo lo que le interesa a uno */
    // const { name = "No name", state = true, page = 1, limit = 10 } = req.query;
    const { limit = 5, from = 0 } = req.query;
    /* Validate if the query is correct */
    if (isNaN(+limit) || isNaN(+from)) {
        console.log("Error in the query".red);
        return res.json(
            "Invalid query, please check the information that you're requesting"
        );
    }
    const query = {
        state: true,
    }; /* Cabe recordar que lo ideal es no borrar datos de la base de datos, sino que se debe de cambiar una bandera para que no se muestre, esta bandera se envía para que muestre todos con state true, tanto en el conteo para la variable total como para retornar los resultados */
    // const total = await User.countDocuments(
    //     query
    // ); /* Count será obsoleto, countDocuments está actualizado */
    // const users = await User.find(query)
    //     .limit(Number(limit))
    //     .skip(Number(from));

    /* Lo que se hace con promise.all es que ejecutará las siguientes dos promesas al tiempo de manera asíncrona */
    /* Hay que poner el await para que espere la respuesta de las dos, si una promesa da error, todas darán error */
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).limit(Number(limit)).skip(Number(from)),
    ]); /* Retorna un arreglo, por esto se hace una desestructuración de arreglos */
    res.json({ total, users });
    /* Paginado de los resultados, es para indicarle que solo quiero los usuarios desde el 5 o hasta el 5 */
};

const userPost = async (req, res = response) => {
    /* El middleware ya se ejecuta en las rutas para validar los campos */
    const { name, mail, password, role, image } = req.body;
    const user = new User({ name, mail, password, role, image });
    /* Encripta la contraseña */
    const salt =
        bcrypt.genSaltSync(); /* El salt es la cantidad de vueltas que le hará a la contraseña, entre más alto, más seguro será el hash */
    user.password = bcrypt.hashSync(password, salt);
    /* Guarda en DB */
    await user.save(); /* Save es un método de mongoose */
    res.json({
        msg: "POST API - Controller",
        info: {
            user,
        },
    });
    console.log(`User added successfully`.green);
};

const userPut = async (req, res = response) => {
    const id = req.params.userId;
    const { _id, password, google, ...userRest } = req.body;
    /* TO DO validate against database */

    if (password) {
        const salt = bcrypt.genSaltSync();
        userRest.password = bcrypt.hashSync(password, salt);
    }
    const userUpdated = await User.findByIdAndUpdate(id, userRest);
    res.json(userUpdated);
    console.log("User updated".green);
};

const userPatch = (req, res = response) => {
    const body = req.body;
    res.json({
        msg: "PATCH API - Controller",
        body,
    });
    console.log(body);
};
const userDelete = async (req, res = response) => {
    /* Async para interactuar con la BD */
    const { userId } = req.params;
    // await User.findByIdAndDelete(
    //     userId
    // ); /* Con esto se eliminaría físicamente de la base de datos, pero se perdería la integridad de la base de datos, es mejor cambiarlo únicamente a un estado false */
    await User.findByIdAndUpdate(userId, { state: false });
    res.json({
        msg: "The user has been deleted",
        userId,
    });
    console.log(`User deleted succesfully`.grey);
};
export { userGet, userPost, userPut, userPatch, userDelete };
