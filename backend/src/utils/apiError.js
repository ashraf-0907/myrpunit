import { Error } from "mongoose";

class apiError extends Error{
    constructor(
        statuscode,
        message = "Something went Wrong",
        errors =[],
        stack=""
    ){
        super(message);
        this.statuscode = statuscode;
        this.data  = null;
        this.message = message,
        this.success  = false;
        this.errors = errors;
        
        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}

export {apiError};