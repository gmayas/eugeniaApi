import { Router } from 'express';
const router = Router();

import { getInvId, createInvUser, getInvUserId, deleteInvId, modifyStatusInvId } from '../controllers/invitations.controller';

router.get('/', (req, res) => {
  res.send({ Response: "APIRest for Lupita working", By: "© 2021 Copyright: GMayaS C:\>Desarrollo en Sistemas." }).status(200);
});
//
// Invations  
router.post('/create', createInvUser);
router.get('/getInvUserId/:id_user', getInvUserId );
router.get('/getInvId/:id_inv', getInvId );
router.delete('/removeInvId/:id_inv', deleteInvId);
router.put('/modifyStatusInvId/:id_inv', modifyStatusInvId);
//
export default router;