import express from "express";

import { postUrl } from "../controllers/urlControllers.js";
import { authMiddlewares } from "../middlewares/authMiddleware.js";
import { urlValidation } from "./../middlewares/urlMiddlewares.js"

const urlRouters = express.Router();

urlRouters.post("/urls/shorten", authMiddlewares, urlValidation, postUrl);
// urlRouters.get();
// urlRouters.get();
// urlRouters.delete();

export default urlRouters;