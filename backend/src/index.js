import * as dotenv from "dotenv";
dotenv.config()

// Connecting Database with the app

import dbConnect from "./db/index.js";
import app from "./app.js";

const port = process.env.PORT || 5000;


app.post("/", async (req, res) => {
    const { en, fac } = req.body;
    console.log(en, fac);
    enroll = en; // Semicolon added here to terminate the statement
    faculty = fac; // Semicolon added here to terminate the statement
    reqHTML(en, fac);
    res.send("hello world");
});


dbConnect().then(()=>{
    app.listen(port,()=>{
        console.log(`Application is working on port ${port}`);
    })
}).catch((error)=>{
    console.log("MONGODB connection failed");
})

// Running the controller 

import {reqHTML} from "./controllers/student.controller.js";
var enroll;
var faculty;

