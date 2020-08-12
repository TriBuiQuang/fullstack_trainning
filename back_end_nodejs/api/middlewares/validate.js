export const validateEmail = (email) => {
   const re = /^\S+@\S+$/;

   return re.test(email);
};
