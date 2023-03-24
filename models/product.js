const mongoose=require("mongoose")




const productSchema=mongoose.Schema({
    name:{
        type:String,
        require:[1,"name must be required"]
    },
    price:{
        type:Number,
        require:[1,"price must be required"]
    },
    feacherd:{
        type:Boolean,
        default:false
    },
    CreatedDate:{
        type:Date,
        default:Date.now()
    },
    rating:{
        type:Number,
        default:4.5
    },
    company:{
        type:String,
        enum:{
            values:["caressa","ikea","liddy","marcos"],
            message:"{VALUE} does not match "
        }
    }
})


module.exports=mongoose.model("product",productSchema)