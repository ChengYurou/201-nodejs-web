import items from './routers/items';
import category from './routers/category'

export default function(app) {
    app.use('/items', items);
    app.use('/category', category);
}