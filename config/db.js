const mongoose = require("mongoose");
require('dotenv').config()


mongoose.connect(process.env.DB).then(()=>{
    console.log("mongodb connected")
}).catch((error)=>{
    console.log("err",error)
})

module.exports = mongoose;