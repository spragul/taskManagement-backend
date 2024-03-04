import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const saltRounts = 10;
//hash password
export const hashpassword = async (password) => {
  let salt = await bcrypt.genSaltSync(saltRounts);
  let hashedpassword = await bcrypt.hash(password, salt);
  return hashedpassword;
};

//compare password
export const hashCompare = async (password, hashedpassword) => {
  //  console.log(password,hashedpassword)
  return await bcrypt.compare(password, hashedpassword);
};

//create token
export const createToken = async (payload, timeExpires) => {
  let token = jwt.sign(payload, process.env.secretKey, {
    expiresIn: timeExpires,
  });
  return token;
};

//validate
export const validate = async (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    let data = await jwt.decode(token);
    
    if (Math.floor(new Date() / 1000) < data.exp) {
      console.log("exp", data.exp ,"now",Math.floor(new Date() / 1000))
      next();
    } else {
      res.status(401).send({ message: "Token Expired" });
    }
  } else {
    res.status(400).send({ message: "Token not found" });
  }
};

export const getuserId = async (mydata) => {
  try {
    let token = mydata.split(" ")[1];
    let data = await jwt.decode(token);
    return data._id;
  } catch (error) {
    console.log(error);
  }
};
