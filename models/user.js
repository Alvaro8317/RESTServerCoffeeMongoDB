/* ¿Cómo debería de verse en la base de datos?
Mongo se guarda como objetos dentro de colecciones, las colecciones son como las tablas
{
    name:,
    mail:,
    password: encrypted,
    img: "",
    rol: user,
    state: true or false (Físicamente no se eliminará de la base de datos),
    google: true or false

}
*/
import { Schema, model } from "mongoose";
const userSchema = Schema({
    name: {
        type: String,
        required: [true, "The name is mandatory"],
    },
    mail: {
        type: String,
        required: [true, "The mail is mandatory"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "The password is mandatory"],
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: [
            "ADMIN_ROLE",
            "USER_ROLE",
        ] /* Valida que el rol esté dentro de estos arrays */,
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});
// Aquí se debe de usar una función normal, porque una arrow function cambia el contexto de .this o en este caso, lo mantiene
/* Se cambiará el metodo para evitar que retorne la contraseña cifrada */
userSchema.methods.toJSON = function () { 
    const { __v, password, _id, ...user } = this.toObject(); /* Se extrae versión, contraseña, id y solo se retorna user con el resto de los campos */
    return user;
};

export default model(
    "User" /* Colección */,
    userSchema /* Esquema */
); /* Mongoose por defecto vuelve plural al nombre de colección, si queda como User Mongoose lo dejará como Users */
