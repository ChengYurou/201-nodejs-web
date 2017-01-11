import {Router} from 'express';
import ItemController from '../../controller/ItemController';

const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:id',itemCtrl.getOneItem);
router.post('/',itemCtrl.createItem);
router.delete('/:id',itemCtrl.deleteItem);
router.put('/:id',itemCtrl.updateItem);

export default router;
