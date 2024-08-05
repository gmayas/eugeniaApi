import { Router } from 'express';
const router = Router();
//
import { getUsers, getUserbyId, getUserbyEmail, createUser, modifyPassword, deleteUser } from '../controllers/user.controller';
// User  
router.get('/getUsers', getUsers );
router.get('/getUserbyId/:id_user', getUserbyId );
router.get('/getUserbyEmail/:email', getUserbyEmail );
router.post('/createUser', createUser);
router.put('/modifyPassword/:id_user', modifyPassword);
router.delete('/deleteUser/:id_user', deleteUser);
// //
export default router;