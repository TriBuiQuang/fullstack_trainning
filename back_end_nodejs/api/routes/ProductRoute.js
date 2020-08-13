import express from 'express';

import check_auth from '../middlewares/check_auth.js';
import { CreateProduct, DeleteProduct, EditProduct, GetProduct } from '../controllers/ProductController.js';

const app = express();

app.get('/', check_auth, GetProduct);
app.post('/create', check_auth, CreateProduct);
app.put('/edit', check_auth, EditProduct);
app.delete('/delete', check_auth, DeleteProduct);

export default app;
