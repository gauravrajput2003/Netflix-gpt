export const checkvalidData = (email, password) => {
    const errors = {};
  
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPassValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  
    if (!isEmailValid) {
      errors.email = "Email is not valid";
    }
  
    if (!isPassValid) {
      errors.password = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number";
    }
  
    return errors;
  };