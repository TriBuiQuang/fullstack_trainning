import logger from '../middlewares/logger.js';
const Registration = async (req, res) => {
   logger.info('Start');

   logger.info('Stop');

   return await res.json({
      message: 'Registration',
   });
};

const Login = async (req, res) => {
   logger.info('Start');

   logger.info('Stop');

   return await res.json({
      message: 'List of all posts',
   });
};

export { Login, Registration };
