import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { urlFetch } from './url.controler.js';
import { Student } from '../models/student.model.js';
import { dateCompare } from '../utils/dateCalculate.js';
import { parseHtml } from '../utils/parseHtml.js';

const studentRegistration = async (en, fac) => {

    // console.log("hehe");

    try {

        let existedStud = await Student.findOne({ faculty_no: fac });
        // console.log(existedStud);
        if (existedStud && dateCompare(existedStud.updatedAt)) {
            const htmlString = await urlFetch(en, fac);
            if (!htmlString) {
                // console.log("hehe")
                throw new apiError(501, "Unable to fetch the htmlString");
            }
            const parseObject = parseHtml(htmlString);
            if (parseObject) {
                // console.log(parseObject);
                await Student.updateOne({ faculty_no: parseObject._id }, { $set: { marks: parseObject.marks } });
            }
            return new apiResponse(240, existedStud, "Student is updated");
        } else if (!existedStud) {
            // console.log("jhef")
            const htmlString = await urlFetch(en, fac);
            // console.log("hehe")
            // console.log(htmlString);
            if (!htmlString) {
                // console.log("hehehe")
                throw new apiError(501, "Unable to fetch the htmlString");
            }
            const parseObject = parseHtml(htmlString);
            existedStud = await Student.create({
                faculty_no: parseObject._id,
                name: parseObject.name,
                marks: parseObject.marks,
            });
            return new apiResponse(241, existedStud, "Student is created");
        } else {
            console.log("Student is already created");
        }
    } catch (error) {
        // console.log("bhak")
        throw new apiError(500, "Error with the MongoDB or credentials");
    }
};

export { studentRegistration };
