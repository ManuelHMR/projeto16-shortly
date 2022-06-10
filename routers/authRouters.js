import express from "express";

import { signUp, signIn } from "./../controllers/sessionControllers.js"
import { signUpValidation, signInValidation, signInVerification } from "../middlewares/sessionMiddleware.js";

const authRouters = express.Router();

authRouters.post("/signup", signUpValidation, signUp);
authRouters.post("/signin", signInValidation, signInVerification, signIn);

export default authRouters; 