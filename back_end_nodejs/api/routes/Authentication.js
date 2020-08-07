import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
   try {
      const token = req.headers.authentication.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);

      req.userData = decode;
   } catch (error) {
      return res.status(401).json({
         message: 'Auth failed',
      });
   }

   next();
};
