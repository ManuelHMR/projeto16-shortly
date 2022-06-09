import express from "express";

import { signIn, signUp } from "../controllers/authControllers.js";
import { signUpValidation } from "../middlewares/authMiddleware.js";

const authRouters = express.Router();

authRouters.post("/signup", signUpValidation, signUp);
authRouters.post("/signin", signIn);

export default authRouters; 