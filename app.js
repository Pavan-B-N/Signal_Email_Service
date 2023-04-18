const expres = require("express")
const SendOTP = require("./SendOTP")
const app = expres()
const dotenv = require("dotenv")
dotenv.config();

app.get("/sendOTP", async (req, res) => {
    const { email, otp } = req.query;
    try {
        const isVerified = await verifyAttributes({ email,otp })
    } catch (err) {
        return res.status(406).send(err)
    }
    //sendOTP
    try {
        const msg = await SendOTP(email, otp)
        console.log("request came")
        res.status(200).send("OTP sent successfully")
    } catch (err) {
        return res.status(500).send("Failed to sent OTP " + err)
    }
})


function verifyAttributes(obj) {
    const promise = new Promise((resolve, reject) => {
        const requiredAttributes = [];
        const keys = Object.keys(obj)
        const array = Object.values(obj)
        array.map((ele, index) => {
            if (!ele) {
                requiredAttributes.push(keys[index])
            }
        })
        if (requiredAttributes.length == 0) {
            resolve("Attributes are verified")
        } else {
            reject("Provide Required Attributes " + requiredAttributes);
        }
    })
    return promise;
}

app.listen(process.env.PORT || 4000)