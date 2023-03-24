require("dotenv").config()

require("express-async-errors")
const express=require("express")
const app=express()
const bodyparesr=require("body-parser")
const errorHandlerMiddleware=require("./middleware/error-handler");
const notFound=require("./middleware/not-found");
const connectDB = require("./db/connect");
const productrouter=require("./routes/products")


//middleware
app.use(bodyparesr.urlencoded({ extended: true }))
//routes

app.get("/",(req,res)=>{
    res.send('<h1>04 store api</h1><a href="/api/v1/products">prodactes routes</a>')
})
app.use("/api/v1/products",productrouter)

//product route
app.use(errorHandlerMiddleware)
app.use(notFound)






const port=process.env.PORT || 3000

const start=async()=>{
    try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port,console.log(`the server is working on ${port}`)) 
    } catch(error) {
        console.log(error);
    }
}
start()