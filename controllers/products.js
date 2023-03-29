const product=require("../models/product")



const getallproductstatic=async(req,res)=>{
    const search=req.query
    console.log(search);
    const products=await product.find({}).sort(search)
    res.status(200).json({msg:products})
}
const getallproduct=async(req,res)=>{
    const {feacherd,company,name,sort}=req.query
    const objectquery={}
    if(feacherd){
        objectquery.feacherd=feacherd==="true" ? true:false
    }
    if(company){
        objectquery.company=company
    }
    if(name){
        objectquery.name={$regex:name,$options:"i"}
    } 
    console.log(sort);
    let result= product.find(objectquery)
    if(sort){
        console.log(sort);
     const result=result.sort()
    }
    const products=await result
    res.status(200).json({products,nbHits:products.length})
    
    
}


module.exports={
    getallproductstatic,
    getallproduct
}
