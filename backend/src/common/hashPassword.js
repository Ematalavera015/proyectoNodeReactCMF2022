import bcrypt from "bcryptjs";

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);
  console.log("Password ", typeof password, " Valor ", password);
  return password;
};

export default hashPassword;
