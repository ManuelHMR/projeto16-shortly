import express from "express";

import { postUrl, getUrlById, openUrl } from "../controllers/urlControllers.js";
import { authMiddlewares } from "../middlewares/authMiddleware.js";
import { urlValidation, shortUrlMiddleware } from "./../middlewares/urlMiddlewares.js"

const urlRouters = express.Router();

urlRouters.post("/urls/shorten", authMiddlewares, urlValidation, postUrl);
urlRouters.get("/urls/:id", getUrlById);
urlRouters.get("/urls/open/:shortUrl", shortUrlMiddleware, openUrl);
// urlRouters.delete();

export default urlRouters;