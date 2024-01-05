import * as dotenv from "dotenv";
dotenv.config()

// Connecting Database with the app

import dbConnect from "./db/index.js";
import app from "./app.js";

const port = process.env.PORT || 5000;

dbConnect().then(()=>{
    app.listen(port,()=>{
        console.log(`Application is working on port ${port}`);
    })
}).catch((error)=>{
    console.log("MONGODB connection failed");
})

// Running the controller 

import {reqHTML} from "./controllers/student.controller.js";

const en = `GL9642`
const faculty = `20COB348`

const response  = reqHTML(en,faculty);

// console.log(response);