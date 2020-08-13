import mongoose from 'mongoose';
// middleware
import logger from '../middlewares/logger.js';

// database
import Product from '../models/ProductModel.js';

const CreateProduct = async (req, res) => {
   try {
      logger.info('Start CreateProduct');
      const { body } = req;

      if (!body.name || !body.type) return res.status(400).json({ message: 'Invalid data !!!' });

      let product = new Product({ _id: mongoose.Types.ObjectId() });

      product.name = body.name;
      product.type = body.type;
      product.belong = req.auth.userId;
      await product.save();

      logger.info('Stop CreateProduct');

      return res.status(200).json({ message: 'CREATE_SUCCESS', data: product });
   } catch (error) {
      logger.error('Error CreateProduct ' + error);

      return res.status(500).json({ message: error });
   }
};

const DeleteProduct = async (req, res) => {
   try {
      logger.info('Start DeleteProduct');
      const { query } = req;

      console.log(req.query, 'query');
      if (!query.productId) return res.status(400).json({ message: 'Invalid data !!!' });

      await Product.deleteOne({ _id: query.productId, belong: req.auth.userId });

      logger.info('Stop DeleteProduct');

      return res.status(200).json({ message: 'Delete_SUCCESS' });
   } catch (error) {
      logger.error('Error DeleteProduct ' + error);

      return res.status(500).json({ message: error });
   }
};

const EditProduct = async (req, res) => {
   try {
      logger.info('Start EditProduct');
      const { body } = req;

      if (!body.productId) return res.status(400).json({ message: 'Invalid data !!!' });

      let product = await Product.findOne({ _id: body.productId, belong: req.auth.userId });

      product.name = body.name ? body.name : product.name;
      product.type = body.type ? body.type : product.type;
      product.updated_at = Date.now();
      await product.save();

      logger.info('Stop EditProduct');

      return res.status(200).json({ message: 'Edit_SUCCESS' });
   } catch (error) {
      logger.error('Error EditProduct ' + error);

      return res.status(500).json({ message: error });
   }
};

const GetProduct = async (req, res) => {
   try {
      logger.info('Start GetProduct');
      let { limit, offset } = req.query;

      limit = parseInt(limit);
      offset = parseInt(offset);
      if (isNaN(limit) === true) limit = 5;
      if (isNaN(offset) === true) offset = 0;

      const total = await Product.countDocuments({ user: req.auth.userId });
      const product = await Product.find({ belong: req.auth.userId }).sort('-created_at').skip(offset).limit(limit).select('-__v');

      logger.info('Stop GetProduct');

      return res.status(200).json({ total: total, data: product });
   } catch (error) {
      logger.error('Error GetProduct ' + error);

      return res.status(500).json({ message: error });
   }
};

export { CreateProduct, DeleteProduct, EditProduct, GetProduct };
