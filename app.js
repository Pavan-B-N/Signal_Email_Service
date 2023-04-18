const expres=require("express")
const SendOTP = require("./SendOTP")
const app=expres()

app.get("/",(req,res)=>{
    res.send("ok")
})
app.get("/otp",(req,res)=>{
    SendOTP("pavangowda56005@gmail.com",123456);
    res.send("otp sent")
})

app.listen(process.env.PORT || 3030)