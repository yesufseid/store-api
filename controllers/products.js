const product=require("../models/product")



const getallproductstatic=async(req,res)=>{
    const search=req.query
    console.log(search);
    const products=await product.find({price:{$gt:30}}).select("name price").limit(10).sort("price")
    res.status(200).json({msg:products,nbHits:products.length})
}
const getallproduct=async(req,res)=>{
    const {feacherd,company,name,sort,filds,numericFilters}=req.query
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
    if(numericFilters){
        const operaterMap={
            '>':"$gt",
            '>=':"$gte",
            '<':"$lt",
            '<=':"$lte",
            '=':"$eq",

        }
   const regEX=/\b(>|>=|<|<=|=)\b/g
  let filter=numericFilters.replace(regEX,(mache)=>`-${operaterMap[mache]}-`)
  const options=["price","rating"]
   filter=filter.split(",")
    .forEach((item) =>{
    const [filds,oprater,value]=item.split("-")
  if(options.includes(filds)){
    objectquery[filds]={[oprater]:Number(value)}}
  })     
     }
    console.log(objectquery);
    let result= product.find(objectquery)
    if(sort){
        const sortList=sort.split(",").join(" ")
        result=result.sort(sortList)
    }else{
        result=result.sort("CreatedDate")
    }
    if(filds){
        const fildList=filds.split(",").join(" ")
        console.log(fildList);
        result=result.select(fildList)
    }
   
    const page=Number(req.query.page) || 1
    const limit=Number(req.query.limit) || 10
    const skip =(page-1)*limit
    const products=await result.skip(skip).limit(limit)
    res.status(200).json({products,nbHits:products.length})
    
    
}


module.exports={
    getallproductstatic,
    getallproduct
}
