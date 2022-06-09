import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import urlRouters from "./routers/urlRouters.js";
import authRouters from "./routers/authRouters.js";
import usersRouters from "./routers/usersRouters.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(urlRouters);
app.use(authRouters);
app.use(usersRouters);

let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
});