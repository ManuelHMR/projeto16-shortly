import express from "express";

import { signIn, signUp } from "../controllers/sessionControllers.js";

const sessionRouters = express.Router();

sessionRouters.post("/signup", signUp);
sessionRouters.post("/signin", signIn);

export default sessionRouters; 