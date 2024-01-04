import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    faculty_no:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        lowercase:true,
        trim:true,
    },
    marks:{
        type:[],
    }
},{timestamps:true});


export const Student = new mongoose.model('student',studentSchema);