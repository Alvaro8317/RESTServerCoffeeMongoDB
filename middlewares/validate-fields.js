import { validationResult } from "express-validator";
const validateFields = (req, res, next) => {
    /* Al ser un middleware debe de tener un parametro que se llama next */
    const errorsValidate = validationResult(req);
    if (!errorsValidate.isEmpty()) {
        /* Valida si hay errores, si los hay entonces retorna todos los errores que encontró */
        return res.status(400).json(errorsValidate);
    }
    next();
    /* Lo que significa next es que si llega hasta acá es que siga con el siguiente middleware */
};

export default validateFields;
