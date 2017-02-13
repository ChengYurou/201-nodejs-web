import {Router} from 'express';
import ItemController from '../../controller/itemController';

const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:itemId',itemCtrl.getOne);
router.post('/',itemCtrl.create);
router.delete('/:itemId',itemCtrl.delete);
router.put('/:itemId',itemCtrl.update);

export default router;

