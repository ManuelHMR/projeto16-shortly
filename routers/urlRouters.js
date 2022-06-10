import express from "express";

import { postUrl } from "../controllers/urlControllers.js";
import { authMiddlewares } from "../middlewares/authMiddleware.js";

const urlRouters = express.Router();

urlRouters.post("/urls/shorten", authMiddlewares, postUrl);
// urlRouters.get();
// urlRouters.get();
// urlRouters.delete();

export default urlRouters;