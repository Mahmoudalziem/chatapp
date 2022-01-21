import express from 'express'
import productController from '../controllers/productController'


const Router = express.Router();

Router.get('/', productController.index);

export default Router;