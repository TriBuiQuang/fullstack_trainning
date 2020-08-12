import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// middleware
import logger from '../middlewares/logger.js';
import { validateEmail } from '../middlewares/validate.js';
// database
import User from '../models/UserModel.js';

// Constant
import app from '../../config/app.js';

const Registration = async (req, res) => {
   try {
      logger.info('Start Registration');
      const { body } = req;

      if (!body.password || !body.first_name || !body.last_name || !validateEmail(body.username))
         return res.status(400).json({ message: 'Invalid data !!!' });

      const userExist = await User.findOne({ username: body.username });

      if (userExist) return res.status(400).json({ message: 'User exists !!!' });

      let user = new User({ _id: mongoose.Types.ObjectId() });

      user.username = body.username;
      user.password = bcrypt.hashSync(body.password, 10);
      user.first_name = body.first_name;
      user.last_name = body.last_name;
      user.gender = body.gender;
      user.phone = body.phone ? body.phone : '';
      user.country = body.country ? body.country : '';
      user.city = body.city ? body.city : '';
      user.address = body.address ? body.address : '';
      user.is_superuser = body.is_superuser === true ? true : false;
      user.user_image = body.user_image ? body.user_image : '';
      await user.save();
      logger.info('Stop Registration');

      return res.status(200).json({ message: 'REGISTER_SUCCESS' });
   } catch (error) {
      logger.error('Error Registration ' + error);

      return res.status(500).json({ message: error });
   }
};

const Login = async (req, res) => {
   try {
      logger.info('Start Login');
      const { body } = req;

      if (!validateEmail(body.username) || !body.password) return res.status(400).json({ message: 'Invalid data !!!' });

      const userExist = await User.findOne({ username: body.username });

      if (userExist.length < 1) return res.status(401).json({ message: 'Email is not exists !!!' });

      const match = await bcrypt.compare(req.body.password, userExist.password);

      if (!match) return res.status(401).json({ message: 'User or password is wrong !!!' });

      const token = jwt.sign(
         {
            userId: userExist._id,
            username: userExist.username,
            role: userExist.is_superuser,
         },
         app.secret,
         { expiresIn: '1d' }
      );

      logger.info('Stop Login');

      return res.status(200).json({ message: 'LOGIN_SUCCESS', token: token });
   } catch (error) {
      logger.error('Error Login ' + error);

      return res.status(500).json({ error: error });
   }
};

const Profile = async (req, res) => {
   try {
      logger.info('Start Profile');
      const Profile = await User.findById(req.auth.userId);

      logger.info('Stop Profile');

      return res.status(200).json({ data: Profile });
   } catch (error) {
      logger.error('Error Profile ' + error);

      return res.status(500).json({ error: error });
   }
};

const ChangePassword = async (req, res) => {
   try {
      logger.info('Start ChangePassword');
      const { password, new_password } = req.body;
      const user = await User.findById(req.auth.userId);

      const match = await bcrypt.compare(password, user.password);

      if (!match) return res.status(401).json({ success: false, status: 401, message: 'Wrong password !!!' });
      if (user.length <= 0) return res.status(401).json({ success: false, status: 401, message: 'Dont have this user !!!' });

      user.password = bcrypt.hashSync(new_password, 10);
      user.updated_at = Date.now();
      await user.save();

      logger.info('Stop ChangePassword');

      return res.status(200).json({ message: 'Change password done' });
   } catch (error) {
      logger.error('Error ChangePassword ' + error);

      return res.status(500).json({ error: error });
   }
};

export { Login, Registration, Profile, ChangePassword };
