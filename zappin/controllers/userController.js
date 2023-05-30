const User = require("../models/userModel");
const Joi = require("joi");
const Response = require("../services/response");
const Helper = require("../services/helper");
const { hashPassword } = require("../utils/bcrypt");

  

module.exports = {
    //to show all users
    showUsers :async (req,res,next) => {
        await User.find().select('-password ')
        .then(async(foundUsers) => {
            return Response.successResponseData(res,foundUsers,"Data fetched successfully")
        })
        .catch((err) => {
            return Response.errorResponseWithoutData(res,"something went wrong")
        })
    },


    
    // to edit the user
    Edit: async (req,res,next) => {
      const userid = req.body.id;
      delete req.body.id;
      const reqParam = req.body;
      console.log(reqParam);
        const reqObj = {
          name: Joi.string().required(),
          email:Joi.string().email().required(), 
          mobile:Joi.string().length(10).pattern(/^[0-9]+$/).required()
        };
        const schema = Joi.object(reqObj);
        const { error } = schema.validate(reqParam);
        if (error) {
          return Response.validationErrorResponseData(
            res,
            Helper.validationMessageKey("Input validation", error)
          );
        }
        await User.findOne({_id:userid})
        .then(async foundUser => {
          foundUser.name = reqParam.name,
          foundUser.email = reqParam.email,
          foundUser.mobile = reqParam.mobile
          foundUser.save()
          .then( (result) => {
    
            let resultObj = {
              name: result.name,
              email: result.email,
              mobile: result.mobile,
              reset_token: result.reset_token,
              createdAt: result.createdAt,
              updatedAt: result.updatedAt,
            };
    
            return Response.successResponseData(res,resultObj,"User edited successfully.")
          })
          .catch( (err) => {
            return Response.errorResponseData(res,err,"Something went wrong.")
          }),500
        })
        .catch((err) => {
          return Response.errorResponseData(res,err,"something went wrong")
        })
        },


    //to delte the user
    Delete : async (req,res,next) => {
      const userid = req.params.id;
      console.log(userid,"User Ki Id"); 
      await User.findOneAndDelete({_id:userid})
        .then(async deletedUser => {
          if(!deletedUser){
            return Response.successResponseWithoutData(res,"user not found to delete")
          }
          else{
            return Response.successResponseData(res,deletedUser,"User deleted successfully")  
          }  
        })
        .catch((err) => {
          return Response.errorResponseData(res,err,"something went wrong")
        })
      },



    AddUser : async(req,res,next) => {
      const reqParam = req.body;

      //object to pass in joi for validation
      const reqObj = {
        name: Joi.string().trim().max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string()
          .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9-_!@#$%^&*]{4,50}$/)
          .required(),
        mobile: Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/)
          .optional(),
      };
  
      const schema = Joi.object(reqObj);
      const { error } = schema.validate(reqParam);
      if (error) {
        return Response.validationErrorResponseData(
          res,
          Helper.validationMessageKey("User validation", error)
        );
      }else{
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
                
                // result object for sending in response
                let resultObj = {
                  name: result.name,
                  email: result.email,
                  mobile: result.mobile,
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

}