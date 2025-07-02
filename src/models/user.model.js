import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const UserSchema = new Schema({
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,
           required:true,
            trim:true
        },
        coverImage:{
            type:String,
        },
        watchHistory:[{
            type:Schema.Types.ObjectId,
            ref:"Video",
        }],
        password:{
            type:String,
            required:[  true,"Password is required"],
            
        },
        refreshToken:{
            type:String

        }
    },{

    
        timsstamps:true,
    }
)
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
    next()
})


UserSchema.methods.isPasswordCorrect=async function(password){
 return  await bcrypt.compare(password,this.password);

} 
UserSchema.methods.generateAccessToken=function(){
    jwt.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email,
            fullname:this.fullname,
        }
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY || "1d"   
        }
    )
}
UdserSchema.methods.generateRefreshToken=function(){}




export const User=mongoose.model("User",UserSchema);