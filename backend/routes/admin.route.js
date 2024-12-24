import express from 'express';
const router = express.Router();
import verifyAdmin from '../middleware/verifyAdmin.js'

import {login, getStatus, getUsers, getSellers,  deleteUser, getCategories, deleteCategory, addCategory} from "../controller/admin.controller.js";
import { get } from 'mongoose';

router.post('/login',login)
router.get('/status', verifyAdmin, getStatus);
router.get('/users',verifyAdmin,  getUsers);
router.get('/sellers',verifyAdmin,  getSellers);
router.get('/categories',verifyAdmin,getCategories  );
router.post('/addCategory',verifyAdmin,  addCategory);
router.delete('/deleteCategory',verifyAdmin,  deleteCategory);
router.delete('/deleteUser/:id',verifyAdmin,  deleteUser)

export default router;