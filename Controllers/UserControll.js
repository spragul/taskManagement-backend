import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import {
  hashpassword,
  hashCompare,
  createToken,
} from "../Authentication/auth.js";
import UserModel from "../Model/userSchemas.js";

//signup
export const signup = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      let hashedpassword = await hashpassword(req.body.password);
      req.body.password = hashedpassword;
      let data = await UserModel.create(req.body);
      res.status(200).send({
        userrd: true,
        message: "User Signup Successfull!",
      });
    } else {
      res.status(400).send({ userrd: false, message: "user alreay Exists" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ userrd: false, message: `Internal server error.\n\n${error}` });
    console.log(error);
  }
};

//login
export const login = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
    let timeExpires = "2h";
      if (await hashCompare(req.body.password, user.password)) {
        let token = await createToken(
          {
            _id:user._id,
            name: user.name,
            email: user.email,
          },
          timeExpires
        );
        res.status(200).send({
          message: "Login successful",
          token,
          myid: user._id,
          myname: user.name,
          myRole: user.role,
          userrd: true,
        });
      } else {
        res.status(402).send({ userrd: false, message: "Invalid Credentials" });
      }
    } else {
      res.status(400).send({ userrd: false, message: "user does not exists!" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ userrd: false, message: `Internal server error.\n\n${error}` });
    console.log(error);
  }
};
//forgotpassword
export const forgotpassword = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
     const timeExpires = "10m";
    if (!user) {
      res.send({ rd: false, message: "user not exists" });
    } else {
      const token = await createToken(
        {
          email: user.email,
          id: user._id,
        },
        timeExpires
      );
      const link = `${process.env.FRONTEND}/resetpassword/${user._id}/${token}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.G_MAIL,
          pass: process.env.G_MAIL_PASSWORD,
        },
      });
      var mailOptions = {
        from: process.env.G_MAIL,
        to: user.email,
        subject: "Reset password",
        text: link,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.send({ rd: false, error });
        } else {
          res.send({ rd: true, message: "mail send " });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ rd: false, message: `Internal server error.\n\n${error}` });
  }
};
//resetpassword
export const resetpassword = async (req, res) => {
  const { id, token } = req.params;
  try {
    const olduser = await UserModel.findOne({ _id: id });
    if (!olduser) {
      res.send({ rd: true, message: "user not exists" });
    } else {
      const verify = jwt.verify(token, process.env.secretKey);
      const encryptedPassword = await hashpassword(req.body.password);
      await UserModel.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
      res.status(200).send({
        rd: true,
        message: "password reset",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ rd: false, message: "Something Went Wrong" });
  }
};
