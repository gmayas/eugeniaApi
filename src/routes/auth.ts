import { Router } from 'express';
const router = Router();

import { signUp, signIn, profile, logOut, modifyPasswordUser } from '../controllers/auth.controller';
import { TokenValidation } from '../libs/Validations'

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', TokenValidation, profile);
router.put('/newPassword/:id_user', modifyPasswordUser);
router.post('/logout', TokenValidation, logOut);

export default router;
