
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { Student } from '../models/student.model.js';
// import { Mark } from '../models/marks.model.js'

const reqHTML = async (en, fac) => {
    const url = "https://ctengg.amu.ac.in/web/table_result010.php";

    const body = new URLSearchParams();
    body.set('fac', fac);
    body.set('en', en);
    body.set('prog', 'btech');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Referer': 'https://ctengg.amu.ac.in/web/st_result001.php?prog=btech'
        },
        body: body
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const htmlString = await response.text();
        const dom = new JSDOM(htmlString);

        // Accessing elements after making sure they exist
        let tableResponsive = dom.window.document.querySelector(".table-responsive");
        if (tableResponsive) {
            let tbody = tableResponsive.children[0]?.children[0];
            let infoRow = tableResponsive.children[1]?.children[0]?.children[1];

            // if (tbody) {
            //     console.log(tbody.innerHTML);
            //     // You can perform further DOM manipulations or access elements here
            // } else {
            //     console.error('Tbody not found.');
            // }

            if (infoRow) {
               // console.log(infoRow.innerHTML);
               // console.log(infoRow.children[0]?.innerHTML);
                var faculty_no = infoRow.children[0]?.innerHTML;
                var name = infoRow.children[2]?.innerHTML;
                // creating a student.

               // console.log(facultyNoElement,nameElement);
                if (faculty_no && name) {
                    // const faculty_no = facultyNoElement.innerHTML.trim();
                    // const name = nameElement.innerHTML.trim();
    
                    console.log(faculty_no, name);
    
                    const studExist = await Student.findOne({ faculty_no: faculty_no });
                    var student  = studExist ;
                    if (!studExist) {
                        student = await Student.create({
                            name: name,
                            faculty_no: faculty_no,
                        });
    
                        console.log('New student created:', student);
                    } else {
                        console.log('Student already exists:', studExist);
                    }
                    const userF = await Student.findOne(student._id);
                    if(userF){
                        var count = tbody.childElementCount;
                        var array = new Array();
                        for(var i=0;i<count;i++){
                            var element = tbody.children[i+1];
                            var marksobj = {};
                            if(element){
                                marksobj.course = element.children[0].innerHTML;
                                marksobj.sessional = element.children[1].innerHTML;
                                marksobj.final = element.children[2].innerHTML;
                                marksobj.total = element.children[3].innerHTML;
                                marksobj.grace = element.children[4].innerHTML;
                                marksobj.grade = element.children[5].innerHTML;
                            }
                            array.push(marksobj);
                        }
                        await Student.updateOne({ _id: userF._id }, { $set: { marks: array } });
                    }
                } else {
                    console.error('Faculty number or name not found.');
                }
            } else {
                console.error('.table-responsive not found.');
            }
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

export { reqHTML };

