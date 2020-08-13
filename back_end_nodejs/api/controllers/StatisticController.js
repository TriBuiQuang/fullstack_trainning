// import mongoose from 'mongoose';
// middleware
import logger from '../middlewares/logger.js';

// database
import Product from '../models/ProductModel.js';

const GetStatistic = async (req, res) => {
   try {
      logger.info('Start GetStatistic');
      let statistic;
      const { date_from, date_to, date_by } = req.query;
      const { userId, role } = req.auth;
      // Format date_to to end of the day.
      let date_to_format = new Date(date_to || Date.now());

      date_to_format.setHours(date_to_format.getHours() + 24);
      switch (role) {
         case true:
            statistic = await Product.aggregate([
               { $match: { belong: userId, updated_at: { $gte: new Date(date_from), $lte: date_to_format } } },
               {
                  $group: {
                     _id: { $dateToString: { format: date_by === 'year' ? '%Y' : date_by === 'month' ? '%Y-%m' : '%Y-%m-%d', date: '$updated_at' } },
                     count: { $sum: 1 },
                  },
               },
            ]);
            break;
         default:
            statistic = await Product.aggregate([
               { $match: { belong: userId, updated_at: { $gte: new Date(date_from), $lte: date_to_format } } },
               {
                  $group: {
                     _id: { $dateToString: { format: date_by === 'year' ? '%Y' : date_by === 'month' ? '%Y-%m' : '%Y-%m-%d', date: '$updated_at' } },
                     count: { $sum: 1 },
                  },
               },
            ]);
            break;
      }

      logger.info('Stop GetStatistic');

      return res.status(200).json({ data: statistic });
   } catch (error) {
      logger.error('Error GetStatistic ' + error);

      return res.status(500).json({ message: error });
   }
};

export { GetStatistic };
