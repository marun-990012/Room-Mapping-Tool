import express from 'express';
import roomController from '../../app/controllers/roomController.js';
import authentication from '../../app/middlewares/authentication.js';

const roomRoutes = express.Router();

roomRoutes.post('/room/create',authentication,roomController.create);
roomRoutes.put('/room/update/:id',roomController.update);
roomRoutes.delete('/room/delete/:id',roomController.delete);
roomRoutes.get('/room/list',authentication,roomController.fetch);
roomRoutes.get('/room/:id',authentication,roomController.detail);
roomRoutes.post('/room/deleteplan',authentication,roomController.deletePlan);


export default roomRoutes;