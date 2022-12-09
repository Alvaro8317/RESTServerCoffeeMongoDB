import Router from "express";
import { check } from "express-validator";
import {
    userDelete,
    userGet,
    userPatch,
    userPost,
    userPut,
} from "../controllers/userController.js";
import {
    isValidRol,
    mailExist,
    userExistById,
} from "../helpers/dbValidators.js";
import validateFields from "../middlewares/validate-fields.js";
const router = Router();
router.get(
    "/",
    userGet
); /* Aquí con userGet no se ejecuta la función, solo es la referencia a la misma */

/* express-validator es solamente un middleware, es decir, se ejecuta antes de algo */
/* Check es un middleware que se le puede especificar que campo del body va a revisar */
router.post(
    "/",
    /* Validaciones middleware */
    [
        check("name", "The name is mandatory").not().isEmpty(),
        check(
            "password",
            "The password is mandatory and must to have more of 6 letters"
        ).isLength({ min: 6 }),
        /* name, password, tal como se envía, debe de ir desde el frontend o desde postman para el ejemplo */
        check("mail", "The mail is not valid").isEmail(),
        // check("role", "Is not a valid role").isIn(["ROLE_ADMIN", "USER_ROLE"]), Se valida DIRECTAMENTE en código, pero lo ideal es que se valide con la base de datos
        // check("role").custom(role => isValidRol(role)), /* Esta línea es igual a la siguiente, pero al ser solamente un parametro se puede dejar la referencia a la función y se ejecutará con el único parametro que recibe */
        check("role").custom(isValidRol),
        check("mail").custom(mailExist),
        validateFields,
    ],
    /* Lo que hace isEmail es que hace una validación pero solo la almacena, no revisa el estado de la validación, este resultado se revisa en el controlador */
    userPost
); /* Se recomienda ejecutar los middleware dentro de un objeto ya que pueden ser varios, el orden es "ruta", "{middleware}" y "código a ejecutar" */
router.put(
    "/:userId",
    [
        check("userId", "Is not a valid ID of MongoDB").isMongoId(),
        check("userId").custom(userExistById),
        check("role").custom(isValidRol),
        validateFields /* Valida los errores */,
    ],
    userPut
);
router.patch("/:userId", userPatch);
router.delete(
    "/:userId",
    [
        check("userId", "Is not a valid ID of MongoDB").isMongoId(),
        check("userId").custom(userExistById),
        validateFields,
    ],
    userDelete
);
export default router;
