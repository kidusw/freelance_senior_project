import express from 'express';
const router = express.Router();
import verifyAdmin from '../middleware/verifyAdmin.js'

import {login, getStatus, users, deleteUser} from "../controller/admin.controller.js";

router.post('/login',login)
router.get('/status', verifyAdmin, getStatus);
router.get('/users',verifyAdmin,  users);
router.delete('/deleteUser/:id',verifyAdmin,  deleteUser)

export default router;