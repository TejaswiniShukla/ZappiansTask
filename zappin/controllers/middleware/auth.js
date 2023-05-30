const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");
exports.isAuthenticatedUser = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(res.status(401).json({success:false,message:"UnAuthorised Access"})); //401=unauthorized request
    }
    console.log(authorization);
    const decodeData = jwt.verify(authorization, process.env.JWT_SECRETKEY);
    req.user = await userModel.findById(decodeData.id); //saved the current user in req.user while login
    next();
  };