import { JSDOM } from "jsdom";

const parseHtml = (htmlString) => {
  const dom = new JSDOM(htmlString);
  let tableResponsive = dom.window.document.querySelector(".table-responsive");

  const parsedObject = {};

  //fetching the parent elements

  let tbody = tableResponsive.children[0]?.children[0];
  let infoRow = tableResponsive.children[1]?.children[0]?.children[1];

  var faculty_no = infoRow.children[0]?.innerHTML;
  var name = infoRow.children[2]?.innerHTML;

  parsedObject._id = faculty_no;
  parsedObject.name = name;

  var count = tbody.childElementCount-1;
  var array = new Array(); // this is the array of object the store the marks of each subject
  for (var i = 0; i < count; i++) {
    var element = tbody.children[i + 1];
    var marksobj = {};
    if (element) {
      marksobj.course = element.children[0].innerHTML;
      marksobj.sessional = element.children[1].innerHTML;
      marksobj.final = element.children[2].innerHTML;
      marksobj.total = element.children[3].innerHTML;
      marksobj.grace = element.children[4].innerHTML;
      marksobj.grade = element.children[5].innerHTML;
    }
    array.push(marksobj);
  }
  parsedObject.marks=array;

  return parsedObject;
}


export {parseHtml};
