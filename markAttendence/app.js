const notyf = new Notyf();

const students = JSON.parse(localStorage.getItem("students")) || [];
const findStdByRollNo = rollNo => students.find(std => std.rollNo == rollNo);
const attendenceData = JSON.parse(localStorage.getItem("attendence")) || [];
const checkAttendence = (rollNo) => {
    const today = new Date().toDateString();
    return attendenceData.find(attendence => attendence.date === today && rollNo == attendence.rollNo);
}
const markAttendenceHandler = () => {
    event.preventDefault();
    const rollNo = document.getElementById("rollNumber").value.trim();
    if (!rollNo) {
        return notyf.error("Please Enter rollNo.");
    }
    const isStudent = findStdByRollNo(rollNo);
    if (!isStudent) {
        return notyf.error(`${rollNo} is not correct.`);
    }

    const isMarked = checkAttendence(rollNo);
    if (isMarked) {
        return notyf.error("Today's attendence is already marked.");
    }

    attendenceData.push({ date: new Date().toDateString(), rollNo });
    localStorage.setItem("attendence", JSON.stringify(attendenceData));
    notyf.success(`${rollNo} marked.`);
}