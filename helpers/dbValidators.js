import Role from "../models/role.js";
import User from "../models/user.js"; /* Se deja Users capitalizado para que se pueda instanciar de este prototipo */
const isValidRol = async (role = "") => {
    const existRol = await Role.findOne({ role });
    if (!existRol) {
        throw new Error(`The role ${role} doesn't exist in the database`);
    }
};
const mailExist = async (mail = "") => {
    const validateEmail = await User.findOne({ mail });
    if (validateEmail) {
        throw new Error(`The mail ${mail} is already in use`);
    }
};

const userExistById = async (user = "") => {
    const validateUser = await User.findById(user)
    if(!validateUser){
        throw new Error (`That user doesn't exist`)
    }
}
export { isValidRol, mailExist, userExistById };
