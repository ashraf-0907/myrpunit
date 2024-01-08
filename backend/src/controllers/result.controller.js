import { Student } from "../models/student.model.js";

const resultFetched = async (array) => {
    

    console.log(array,"vdfasdf");
    const stud = array[0];
    // console.log(stud);
    array.pop();

    try {
        const result1 = await Student.findOne({ faculty_no: stud.fac1 }).select(
            "-faculty_no -_id -createdAt -updatedAt"
        );
        const result2 = await Student.findOne({ faculty_no: stud.fac2 }).select(
            "-faculty_no -_id -createdAt -updatedAt"
        );

        console.log("hehe",result1.marks);
        console.log("he0000003he",result2.marks);

        if (result1 && result2 && result1.marks && result2.marks) {
            return { result1: result1, result2: result2 };
        } else {
            // Handle cases where result1 or result2 or their Marks are not found
            return null;
        }
    } catch (error) {
        console.error("Error fetching results:", error);
        return null; // Handle errors appropriately
    }
};

export { resultFetched };
