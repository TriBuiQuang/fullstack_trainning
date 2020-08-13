import express from 'express';

import UserRoute from './UserRoute.js';
import ProductRoute from './ProductRoute.js';
import StatisticRoute from './StatisticRoute.js';

const app = express();

// This is router global.
app.use('/user/', UserRoute);
app.use('/product/', ProductRoute);
app.use('/statistic/', StatisticRoute);

export default app;
