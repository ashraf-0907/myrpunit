import { Router } from "express";
// import {array} from "../constants.js"
import { studentRegistration } from "../controllers/student.controller.js";
import { resultFetched } from "../controllers/result.controller.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const router = Router();

const array = []; 

router.route("/").post(async (req, res) => {
  const { en1, fac1, en2, fac2} = req.body;

  // console.log(en,fac);

  // console.log(array);
  console.log(req.body);

  try {
    console.log("hehe")
    await studentRegistration(en1, fac1);
    await studentRegistration(en2, fac2);
    fac1.toUpperCase();
    fac2.toUpperCase();
    console.log(fac1,fac2);
    array.push({fac1:fac1,fac2:fac2});
    // console.log(array);
   
    res.status(201).json( new apiResponse(201,"Data send Successfully"));
  } catch (error) {
    res.status(404).json(new apiError(401,"Student Registration error"));
  }
});

// console.log(array);

router.route("/compareResult").get(async (req, res) => {
  console.log(array);
    try {
      const result = await resultFetched(array);
  
      if (result) {
        res.status(201).json(new apiResponse(200,result,"Data is availabe at the frontend"));
      } else {
        res.status(404).json(new apiResponse(401,{},"Results not found"));
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching results" });
    }
  });
  

// export default router;


// import { Router } from "express";
// import { studentRegistration } from "../controllers/student.controller.js";
// import { resultFetched } from "../controllers/result.controller.js";
// import { apiError } from "../utils/apiError.js";
// import { apiResponse } from "../utils/apiResponse.js";

// const router = Router();

// // Using closure to maintain 'array' state
//   const array = [];

//   router.route("/").post(async (req, res) => {
//     const { en, fac } = req.body;

//     console.log(en, fac);

//     array.push({ en: en, fac: fac });

//     try {
//       await studentRegistration(en, fac);
//       res.status(201).json(new apiResponse(201, "Data send Successfully"));
//     } catch (error) {
//       res.status(404).json(new apiError(401, "Student Registration error"));
//     }
//   });

//   router.route("/compareResult").get(async (req, res) => {
//     console.log(array);
//     try {
//       const result = await resultFetched(array);

//       if (result) {
//         res.status(201).json(new apiResponse(200, result, "Data is available at the frontend"));
//       } else {
//         res.status(404).json(new apiResponse(401, {}, "Results not found"));
//       }
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching results" });
//     }
//   });

export default router;

