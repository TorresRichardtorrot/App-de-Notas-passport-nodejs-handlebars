import { Schema, model } from 'mongoose';

const NoteSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
        require:true
    },
    user:{
        type:String,
        require:true
    }
},{
    versionKey:false,
    timestamps: true
})

export default model('Note', NoteSchema);