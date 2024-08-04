import { Router } from 'express';
const router = Router();

import { getInvId, createInvUser, getInvUserId, deleteInvId, modifyInvId } from '../controllers/invitations.controller';

router.get('/', (req, res) => {
  res.send({ Response: "APIRest for Lupita working", By: "© 2021 Copyright: GMayaS C:\>Desarrollo en Sistemas." }).status(200);
});

// Invations  
router.post('/create', createInvUser);
router.get('/getUserId/:id_user', getInvUserId );
router.get('/getId/:id_inv', getInvId );
router.delete('/removeId/:id_inv', deleteInvId);
router.put('/modifyId/:id_inv', modifyInvId);
//
export default router;