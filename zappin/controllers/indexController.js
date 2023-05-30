const User = require("../models/userModel");
const Joi = require("joi");
const Response = require("../services/response");
const jwtToken = require("../services/jwtToken");
const Helper = require("../services/helper");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
  
module.exports = {
  //function for sign up
  register: async (req, res, next) => {
    const reqParam = req.body;
    //object to pass in joi for validation
    const reqObj = {
      name: Joi.string().trim().max(15).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9-_!@#$%^&*]{4,20}$/)
        .required(),
      mobile: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .optional(),
    };

    const schema = Joi.object(reqObj);
    
    //it give error in validation
    const { error } = schema.validate(reqParam);
    if (error) {
      return Response.validationErrorResponseData(
        res,
        Helper.validationMessageKey("Sign up validation", error)
      );
    } else {

      //if not any error// hashthe password
      const passwordHash = hashPassword(reqParam.password);

      let userObj = {
        name: reqParam.name,
        email: reqParam.email,
        password: passwordHash,
        mobile: reqParam.mobile,
      };
      

      //checking if the email already exist
      await User.findOne({ email: reqParam.email })
        .then(async (userexist) => {

          if (!userexist) {

            await User.create(userObj)
              .then(async (result) => {

                if (!result) {
                  return Response.errorResponseWithoutData(
                    res,
                    "Something went wrong"
                  );
                }

                //generating token
                const token = jwtToken.issueUser({
                  id: result._id,
                  email: result.email,
                });

                result.token = token;
                await result.save();

                // result object for sending in response
                let resultObj = {
                  name: result.name,
                  email: result.email,
                  mobile: result.mobile,
                  token: result.token,
                  createdAt: result.createdAt,
                  updatedAt: result.updatedAt,
                };

                return Response.successResponseData(
                  res,
                  resultObj,
                  "user created successfully"
                );
              })
              .catch((e) => {
                console.log(e);
                return Response.errorResponseWithoutData(
                  res,
                  "Something went wrong"
                );
              });

              //if user already found
          } else {
            return Response.errorResponseWithoutData(
              res,
              "Email is already registered",
              500
            );
          }
        })
        .catch((e) => {
          console.log(e);
          return Response.errorResponseWithoutData(res, "Something went wrong");
        });
    }
  },



  //function for login
  login: async (req, res, next) => {
    const reqParam = req.body;

    const reqObj = {
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9-_!@#$%^&*]{4,50}$/)
        .required(),
    };
    
    const schema = Joi.object(reqObj);

    const { error } = schema.validate(reqParam);

    if (error) {
      return Response.validationErrorResponseData(
        res,
        Helper.validationMessageKey("Login validation", error)
      );
    } 
    else {

      let foundUser = await User.findOne({ email: reqParam.email });

      if (!foundUser) {
        return Response.errorResponseWithoutData(
          res,
          "Incorrect email .",
          400
        );
      }
       
      //comparing password
      let validate = comparePassword(reqParam.password, foundUser.password);

      if (!validate) {
        return Response.errorResponseWithoutData(
          res,
          "Incorrect password.",
          400
        );
      }

      const token = jwtToken.issueUser({
        id: foundUser._id,
        email: foundUser.email,
      });

      foundUser.token = token;

      await foundUser.save();



      let resultObj = {
        name: foundUser.name,
        email: foundUser.email,
        mobile: foundUser.mobile,
        status: foundUser.status,
        token: foundUser.token,
        createdAt: foundUser.createdAt,
        updatedAt: foundUser.updatedAt,
      };

      return Response.successResponseData(
        res,
        resultObj,
        "Login success.",
        200
      );
    }
  },
  
};

