const {Router} = require('express');
const CartController = require('../../controller/cartController')

const router = Router();
const cartCtrl = new CartController();

router.get('/',cartCtrl.getAll);
router.get('/:cartId',cartCtrl.getOne);
router.delete('/:cartId',cartCtrl.delete);
router.post('/',cartCtrl.create);
router.put('/:cartId',cartCtrl.update);

export default router;
