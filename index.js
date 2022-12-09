import Server from "./models/server.js";

const serverE = new Server();
// serverE.routes() No es necesario ejecutarlo si está en el constructor
serverE.listen()