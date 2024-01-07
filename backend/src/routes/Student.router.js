import { Router } from "express";
import { reqHTML } from "../controllers/student.controller.js";
import { resultFetched } from "../controllers/result.controller.js";

const router = Router();

const array = []; 

router.route("/").post(async (req, res) => {
  const { en, fac } = req.body;

  array.push({ en: en, fac: fac });

  try {
    await reqHTML(en, fac);
    res.status(200).json({ message: "Data sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error sending data" });
  }
});

router.route("/compareResult").get(async (req, res) => {
    try {
      const result = await resultFetched(array);
  
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Results not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching results" });
    }
  });
  

export default router;

