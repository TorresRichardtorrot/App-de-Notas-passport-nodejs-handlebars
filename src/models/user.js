import { Schema, model } from'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    name:{type:String , required:true},
    email: { type: String , required:true, unique:true},
    password:{type:String, required:true}
},{
    timestamps:true,
    versionKey:false
});

UserSchema.methods.encryptPassword = async password => {
    const salt = await  bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt)
}

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password,this.password)
}

export default model('User', UserSchema)