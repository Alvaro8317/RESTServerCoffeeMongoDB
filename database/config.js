import mongoose from "mongoose";
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); /* Si fuera promesas, podría dejar un .then, pero al ser async puedo dejar un await */
        console.log("Connected to the database");
    } catch (err) {
        console.error(err);
        throw new Error("Exist an error at the connection with the database");
    }
};
export default dbConnection;
