const mongoose=require("mongoose")



const userShema=new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},

},{minimize:false})


module.exports=mongoose.model("user",userShema)