import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
const app=express();
const PORT=process.env.PORT || 3001
import  rateLimit from "express-rate-limit";
import apicache from "apicache";
import cors from "cors"
const cache=apicache.middleware;
app.use(cors())
app.use(cache('5 minutes'))
app.use("/",createProxyMiddleware({
    target:process.env.web_http,
    changeOrigin:true
}))
app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})
