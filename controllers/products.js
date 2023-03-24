
const getallproductstatic=async(req,res)=>{
    res.status(200).json({msg:"tsting peoduct statisc"})
}
const getallproduct=async(req,res)=>{
    throw Error("accsess dinaed")
    res.status(200).json({msg:"tsting peoduct"})
}


module.exports={
    getallproductstatic,
    getallproduct
}
