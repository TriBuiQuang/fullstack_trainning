const validateInput = (type, checkingText) => {
   if (type === "username") {
      if(checkingText === ""){
         return {isError : true , errorMessage : 'Username must not empty !!!'}
      }
      /* Kiểm tra username */
   }
   
   if (type === "password") {
      /* Kiểm tra password */
      if(checkingText.length < 6){
         return {isError : true , errorMessage : 'Password must more than 5 !!!'}
      }
   }

   return {isError : false , errorMessage : ''};
}

export default validateInput;