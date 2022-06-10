import express from "express";

import { getUser, getRanking } from "./../controllers/usersControllers.js";
import { authMiddlewares } from "../middlewares/authMiddleware.js";
import { userMiddleware } from "./../middlewares/userMiddlewares.js";

const usersRouters = express.Router();

usersRouters.get("/users/:id", authMiddlewares, userMiddleware, getUser);
usersRouters.get("/ranking", getRanking);

export default usersRouters;