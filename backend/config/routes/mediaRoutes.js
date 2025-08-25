import express from 'express';
import upload from '../configurations/multerConfig.js';
import mediaUploadController from '../../app/controllers/mediaUploadController.js';

const mediaRoute = express.Router();

mediaRoute.post('/image/upload',upload.single('file'),mediaUploadController.uploadImage);

export default mediaRoute;