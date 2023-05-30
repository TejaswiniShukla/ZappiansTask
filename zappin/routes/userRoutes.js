const router=require("express").Router();
const { isAuthenticatedUser } = require("../controllers/middleware/auth");
const {showUsers,Edit, Delete, AddUser} = require('../controllers/userController')


router.get("/show",showUsers);

router.post("/add",AddUser)

router.patch("/edit",Edit);

router.post("/delete/:id",Delete);



module.exports = router;
