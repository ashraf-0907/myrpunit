import { Student } from "../models/student.model.js";

const resultFetched = async (array) => {
    if (array.length <= 1) {
        return null; // Return null or handle appropriately if array length is less than 2
    }
    
    const firstStudent = array[0];
    const secondStudent = array[1];

    array.pop();
    array.pop();

    console.log(firstStudent,"hihk");
    console.log(secondStudent);

    try {
        const result1 = await Student.findOne({ faculty_no: firstStudent.fac });
        const result2 = await Student.findOne({ faculty_no: secondStudent.fac });

        console.log(result1.marks);
        console.log(result2.marks);

        if (result1 && result2 && result1.marks && result2.marks) {
            return { result1Marks: result1.marks, result2Marks: result2.marks };
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
