import { Router } from 'express';
const router = Router();
//
import { getUsers, getUserbyId, getUserbyEmail, deleteUser } from '../controllers/user.controller';
import { TokenValidation } from '../libs/Validations';
// User  
router.get('/getUsers', TokenValidation, getUsers );
router.get('/getUserbyId/:id_user', TokenValidation, getUserbyId );
router.get('/getUserbyEmail/:email', TokenValidation, getUserbyEmail );
router.delete('/deleteUser/:id_user', TokenValidation, deleteUser);
// //
export default router;