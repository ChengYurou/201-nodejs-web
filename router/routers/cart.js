import {Router} from 'express';
import CartController from '../../controller/CartController';

const router = Router();
const cartCtrl = new CartController();

router.get('/',cartCtrl.getAll);
router.post('/',cartCtrl.createCart);
router.put('/:cartId',cartCtrl.updateCart);
router.delete('/:cartId',cartCtrl.deleteCart);
router.post('/:cartId/item',cartCtrl.addNewItemToCart);
router.post('/:cartId/item/:itemId',cartCtrl.addOldItemToCart);
router.delete('/:cartId/item/:itemId',cartCtrl.removeItemFromCart);

export default router;