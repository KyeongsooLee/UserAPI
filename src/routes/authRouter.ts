import express from 'express';
import { validRegister } from '../middlewares/valid';
import authCtrl from '../controllers/authCtrl';
import uploadImage from '../middlewares/uploadImage';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.post('/register', validRegister, authCtrl.register);

router.post('/login', authCtrl.login);

router.get('/logout', authCtrl.logout);

router.post('/upload', auth, uploadImage.single('image'), authCtrl.upload);

router.get('/posts', authCtrl.posts);

export default router;