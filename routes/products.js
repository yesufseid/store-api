const express=require("express");
const router=express.Router()
const {
    getallproductstatic,
    getallproduct
}=require("../controllers/products")


router.route("/").get(getallproduct)
router.route("/static").get(getallproductstatic)



module.exports=router