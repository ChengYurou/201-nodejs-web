const {Router} = require('express');
const CategoryController = require('../../controller/categoryController');

const router = Router();
const categoryCtrl = new CategoryController();

router.get('/',categoryCtrl.getAll);
router.get('/:categoryId',categoryCtrl.getOneCategory);
router.post('/',categoryCtrl.createCategory);
router.put('/:categoryId',categoryCtrl.updateCategory);
router.delete('/:categoryId',categoryCtrl.deleteCategory);

router.post('/:categoryId/item',categoryCtrl.addItemToCategory);
router.put('/:categoryId/item/:itemId',categoryCtrl.updateItemInCategory);
router.delete('/item/:itemId',categoryCtrl.removeItemFromCategory);

export default router;