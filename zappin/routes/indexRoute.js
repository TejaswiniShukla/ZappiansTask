const router=require("express").Router();

const { register,login } = require("../controllers/indexController");



router.post("/register",register)

router.post("/login",login)




module.exports = router;