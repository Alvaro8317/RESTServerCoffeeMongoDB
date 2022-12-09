import { Schema, model } from "mongoose";
const roleSchema = Schema({
    role: {
        type: String,
        required: [true, "The role is mandatory"],
    },
});

export default model("Role", roleSchema);
