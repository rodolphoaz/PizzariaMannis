import {  Router  } from "express";
import multer from "multer";


import { CreateUserController} from './controllers/User/CreateUserController'
import { AuthUserController } from "./controllers/User/AuthUserController"
import { DetailUserController } from "./controllers/User/DetailUserController"

import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'

import { CreateProductController }from './controllers/product/CreateProductController'
import { ListByCategoryController }from'./controllers/product/ListByCategoryController'

import{CreateOrderController} from './controllers/order/CreateOrderController'
import { RemoveOrdemController } from './controllers/order/RemoveOrdemController'
import { AddItemController } from './controllers/order/AddItemController'
import { RemoveItemController } from './controllers/order/RemoveItemController'

import {SendOrderController}from './controllers/order/SendOrderController'

import {ListOrdersController } from './controllers/order/ListOrdersController' 
import { DetailOrderController } from './controllers/order/DetailOrderController'
import { FinishOrderController } from "./controllers/order/FinishOrderController";



import{isAuthenticated} from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'

const router  = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//Rotas de user

router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/about',isAuthenticated, new DetailUserController().handle)

//Rotas de categorias

router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new  ListCategoryController().handle)

//Rotas de produtos

router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

router.get('/categoy/product', isAuthenticated, new ListByCategoryController().handle)

//Rotas de Order - Abrir - fechar - enviar pedidos para mesa

router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrdemController().handle)


router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)


router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/order/list', isAuthenticated, new ListOrdersController().handle)

router.get('/order/datail', isAuthenticated, new DetailOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)


export {router};