import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
const app=express();
const PORT=process.env.PORT || 3001
import  rateLimit from "express-rate-limit";
import apicache from "apicache";
import cors from "cors"
const limiter=rateLimit({
    windowMs:10*60*1000,
    max:20
})
const cache=apicache.middleware;
app.use(limiter)
app.use(cors())
app.use(cache('5 minutes'))
app.use("/data",createProxyMiddleware({
    target:process.env.web_http,
    changeOrigin:true
}))
app.get("/",(req,res)=>{
res.send("welcome to the page use route to get data /products");
})
app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})
