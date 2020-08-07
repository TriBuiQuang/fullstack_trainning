import express from 'express';

import __dirname from '../../config/constant.js';
import { Login, Registration } from '../controllers/UserController.js';

const app = express();

app.get('/', (req, res) => {
   console.log(__dirname);
   res.sendFile(__dirname + '/front_end/index.html');
});

app.get('/login', Login);

app.get('/registration', Registration);

export default app;
