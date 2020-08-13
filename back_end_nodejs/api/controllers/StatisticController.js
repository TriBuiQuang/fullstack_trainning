// import mongoose from 'mongoose';
// middleware
import logger from '../middlewares/logger.js';

// database
// import Product from '../models/ProductModel.js';

const GetStatistic = async (req, res) => {
   try {
      logger.info('Start GetStatistic');

      logger.info('Stop GetStatistic');

      return res.status(200).json({ message: 'Get_SUCCESS' });
   } catch (error) {
      logger.error('Error GetStatistic ' + error);

      return res.status(500).json({ message: error });
   }
};

export { GetStatistic };
