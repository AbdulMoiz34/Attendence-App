const notyf = new Notyf();
const students = JSON.parse(localStorage.getItem("students")) || [];

const setData = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
}

class Student {
    constructor(rollNo, course, email, fullName, fatherName, cnic) {
        this.rollNo = rollNo;
        this.courseName = course;
        this.email = email;
        this.fullName = fullName;
        this.fatherName = fatherName;
        this.cnic = cnic;
    }
}
// courses dropdown
const availableCourses = ["Digital Marketing", "Web & App Ddevelopment", "Generative AI", "UI/UX Design"];
const courseSelect = document.querySelector("#course");
availableCourses.forEach(course => {
    courseSelect.innerHTML += `<option value="${course.toLowerCase()}">${course}</option>`;
});

const getStudentByRollNo = rollNo => {
    return students.find(std => std.rollNo == rollNo);
}

const addStudent = () => {
    event.preventDefault();
    const rollNo = document.querySelector("#rollNumber").value;
    const course = document.querySelector("#course").value;
    const email = document.querySelector("#email").value;
    const fullName = document.querySelector("#fullName").value;
    const fatherName = document.querySelector("#fatherName").value;
    const cnic = document.querySelector("#cnic").value;
    const isFound = getStudentByRollNo(rollNo);
    if (isFound) {
        notyf.error("Student is already exist.");
        return;
    }
    const student = new Student(rollNo, course, email, fullName, fatherName, cnic);
    students.push(student);
    setData("students", students);
    notyf.success("Student has been added.");
    event.target.reset();
}
const fileInp = document.getElementById("fileInput");
const submitBtn = document.getElementById("fileSubmitButton");
const fileName = document.getElementById("fileName");
const getFileHandler = () => {
    submitBtn.textContent = "Submit";
    submitBtn.classList.add("submit");
    fileName.innerHTML = `${fileInp.files[0].name} <i class="fa-solid fa-trash btn" onclick="removeFile()"></i>`;
}

const removeFile = () => {
    fileName.innerHTML = "";
    fileInp.value = "";
    submitBtn.textContent = `Add Students by Excel File`;
    submitBtn.classList.remove("submit");
}

const fileSubmitBtnHandler = () => {
    if (submitBtn.textContent == "Submit") {
        getFileData();
    } else {
        document.getElementById("fileInput").click();
    }
}

const getFileData = async () => {
    const file = fileInp.files[0];
    try {
        const data = await processExcelFile(file);
        const isFound = data.filter(std => getStudentByRollNo(std.rollNo));
        if (isFound.length) {
            throw new Error(`${isFound.length} ${isFound.length > 1 ? "Students" : "Student"} exist.`);
        }
        students.push(...data);
        setData("students", students);
        notyf.success(`${data.length} student has been added.`);
    } catch (err) {
        notyf.error(err.message);
    }
}

const parseExcelFile = async (file) => {
    try {
        return await readXlsxFile(file);
    } catch (err) {
        throw new Error("Error reading excel file");
    }
}

const processExcelFile = async (file) => {
    try {
        const rows = await parseExcelFile(file);
        const headers = rows.at(0);
        validateHeaders(headers);
        rows.slice(1).forEach((row, i) => validateRow(row, i));
        return convertExcelObjectsIntoArrays(rows);
    } catch (err) {
        throw err;
    }
}

const validateHeaders = (headers) => {
    const expectedHeaders = ["rollNo", "courseName", "email", "fullName", "fatherName", "cnic"];
    if (headers.length !== expectedHeaders.length) {
        throw new Error("Length is not valid");
    }
    headers.forEach((header, idx) => {
        if (header !== expectedHeaders[idx]) {
            throw new Error(`Headers are not accurate.`);
        }
    });
}


const validateRow = (row, idx) => {
    const [rollNo, courseName, email, fullName, fatherName, cnic] = row;
    if (!rollNo || !courseName || !email || !fullName || !fatherName || !cnic) {
        throw new Error(`There is something wrong in Row No: ${idx + 1}. All fields are required.`);
    }
    if (!availableCourses.includes(courseName)) {
        throw new Error(`Course is not valid in Row: ${idx + 1}`);
    }
    if (isNaN(rollNo)) {
        throw new Error(`Roll No must be in numbers. Row No: ${idx + 1}`);
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error(`Email is not valid in row no: ${idx + 1}`);
    }
}

const convertExcelObjectsIntoArrays = (data) => {
    const [headers, ...rows] = data;
    return rows.map((row) => {
        const obj = {};
        headers.forEach((header, idx) => {
            obj[header] = row[idx];
        });
        return obj;
    });
}

