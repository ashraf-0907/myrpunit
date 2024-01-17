import { Router } from "express";
import { studentRegistration } from "../controllers/student.controller.js";
import { resultFetched } from "../controllers/result.controller.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Mutex } from "async-mutex";

const router = Router();
const array = [];
const mutex = new Mutex();

router.route("/").post(async (req, res) => {
  const { en1, fac1, en2, fac2 } = req.body;

  try {
    await studentRegistration(en1, fac1);
    await studentRegistration(en2, fac2);

    // Ensure atomic access to the shared array
    await mutex.runExclusive(async () => {
      fac1.toUpperCase();
      fac2.toUpperCase();
      array.push({ fac1: fac1, fac2: fac2 });
    });

    res.status(201).json(new apiResponse(201, "Data send Successfully"));
  } catch (error) {
    res.status(404).json(new apiError(401, "Student Registration error"));
  }
});

router.route("/compareResult").get(async (req, res) => {
  try {
    const result = await resultFetched(array);

    if (result) {
      res.status(201).json(new apiResponse(200, result, "Data is available at the frontend"));
    } else {
      res.status(404).json(new apiResponse(401, {}, "Results not found"));
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching results" });
  }
});

export default router;
