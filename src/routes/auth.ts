import { Router } from 'express';
const router = Router();
//
import { signUp, signIn, profile, logOut, modifyPasswordUser, isLoggedIn } from '../controllers/auth.controller';
import { TokenValidation } from '../libs/Validations'
//
router.post('/signUp', signUp); //Create User
router.post('/signIn', signIn); //Login
router.post('/profile', TokenValidation, profile);
router.put('/newPassword/:id_user', modifyPasswordUser);
router.post('/logout', TokenValidation, logOut);
router.get("/auth", TokenValidation, isLoggedIn);
//
export default router;
