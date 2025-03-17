// courses dropdown
AOS.init();
const table = document.querySelector(".attendence-table");
const currentDate = new Date();
const allStudents = JSON.parse(localStorage.getItem("students")) || [];
const attendenceRecord = JSON.parse(localStorage.getItem("attendence")) || [];
const currentDateInStr = currentDate.toDateString();
const isPresentHandler = (rollNo, date) => {
    return attendenceRecord.find(std => std.rollNo == rollNo && date === std.date);
}
let totalPresentStd = 0;
let totalAbsentStd = 0;
let totalAveragePresentStd = 0;
const renderAttendStudent = (date = currentDateInStr) => {
    totalPresentStd = 0;
    totalAbsentStd = 0;
    table.innerHTML = "";
    let i = 0;
    for (let std of allStudents) {
        i++;
        const isPresent = isPresentHandler(std.rollNo, date);
        if (isPresent) {
            totalPresentStd++;
        }
        table.innerHTML += ` <tr>
        <td>${i}</td>
        <td>${std.fullName}</td>
        <td>${std.rollNo}</td>
        <td>${std.courseName}</td>
        <td>${date}</td>
        <td><span class="badge ${isPresent ? 'bg-success' : 'bg-danger'}">${isPresent ? "Present" : "Absent"}</span></td>
    </tr>`;
    }
    totalAbsentStd = allStudents.length - totalPresentStd;
    totalAveragePresentStd = totalPresentStd / allStudents.length * 100;
}

renderAttendStudent();

const totalPresentEl = document.querySelector(".total-present-std");
const totalAbsentEl = document.querySelector(".total-absent-std");
const showAverageEl = document.querySelector(".overall-average");
totalPresentEl.textContent = totalPresentStd;
totalAbsentEl.textContent = totalAbsentStd;

// totalAveragePresentStd = totalPresentStd / allStudents.length * 100;
if (!totalPresentStd.length) {
    showAverageEl.textContent = `0%`;
} else if (totalAveragePresentStd.toString().includes(".")) {
    showAverageEl.textContent = totalAveragePresentStd.toFixed(2) + "%";
} else {
    showAverageEl.textContent = totalAveragePresentStd + "%";
}


// date
const dateInp = document.getElementById("date");
// local date in YYYY-MM-DD
const local = currentDate.getFullYear() + "-" + String(currentDate.getMonth() + 1).padStart(2, 0) + "-" + String(currentDate.getDate()).padStart(2, 0);
dateInp.value = local;


function setDateHandler() {
    console.log((dateInp.value));
    const date = new Date(dateInp.value).toDateString();
    renderAttendStudent(date);
    totalPresentEl.textContent = totalPresentStd;
    totalAbsentEl.textContent = totalAbsentStd;
    if (!totalPresentStd.length) {
        showAverageEl.textContent = `0%`;
    } else if (totalAveragePresentStd.toString().includes(".")) {
        showAverageEl.textContent = totalAveragePresentStd.toFixed(2) + "%";
    } else {
        showAverageEl.textContent = totalAveragePresentStd + "%";
    }
}