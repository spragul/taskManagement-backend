import express from "express"
const router = express.Router();
import {forgotpassword, login, resetpassword, signup}from "../Controllers/UserControll.js"

router.post('/signup',signup);
router.post('/login',login);
router.post('/forgotpassword',forgotpassword);
router.post('/resetpassword/:id/:token',resetpassword);
export default router;