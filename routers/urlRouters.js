import express from "express";

import { postUrl, getUrlById } from "../controllers/urlControllers.js";
import { authMiddlewares } from "../middlewares/authMiddleware.js";
import { urlValidation } from "./../middlewares/urlMiddlewares.js"

const urlRouters = express.Router();

urlRouters.post("/urls/shorten", authMiddlewares, urlValidation, postUrl);
urlRouters.get("/urls/:id", getUrlById);
// urlRouters.get();
// urlRouters.delete();

export default urlRouters;