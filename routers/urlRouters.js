import express from "express";

import { postUrl, getUrlById, openUrl, deleteUrl } from "../controllers/urlControllers.js";
import { authMiddlewares } from "../middlewares/authMiddleware.js";
import { urlValidation, shortUrlMiddleware, checkId } from "./../middlewares/urlMiddlewares.js"

const urlRouters = express.Router();

urlRouters.post("/urls/shorten", authMiddlewares, urlValidation, postUrl);
urlRouters.get("/urls/:id", getUrlById);
urlRouters.get("/urls/open/:shortUrl", shortUrlMiddleware, openUrl);
urlRouters.delete("/urls/:id", authMiddlewares, checkId, deleteUrl);

export default urlRouters;