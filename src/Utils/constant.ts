export const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const PASSWORD_PATTERN =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,}$/; 
// Password must contain 
//   one digit from 1 to 9, 
//   one lowercase letter, 
//   one uppercase letter, 
//   one special character, 
//   no space, 
//   and it must be at least 6 characters long
