import express from 'express';

import check_auth from '../middlewares/check_auth.js';
import { GetStatistic } from '../controllers/StatisticController.js';

const app = express();

app.get('/', check_auth, GetStatistic);

export default app;
