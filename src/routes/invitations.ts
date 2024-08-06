import { Router } from 'express';
const router = Router();
//
import { getInvId, createInvUser, getInvUserId, deleteInvId, modifyStatusInvId } from '../controllers/invitations.controller';
import { TokenValidation } from '../libs/Validations';
// Invitations  
router.post('/createInvUser', TokenValidation, createInvUser);
router.get('/getInvUserId/:id_user', TokenValidation, getInvUserId );
router.get('/getInvId/:id_inv', TokenValidation, getInvId );
router.delete('/removeInvId/:id_inv', TokenValidation, deleteInvId);
router.put('/modifyStatusInvId/:id_inv', TokenValidation, modifyStatusInvId);
//
export default router;