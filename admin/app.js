const isLogin = localStorage.getItem("isLogin") || false;
const students = JSON.parse(localStorage.getItem("students")) || false;
if (!(isLogin === "true")) {
    location = "../index.html";
}

if (!students.length) {
    document.querySelector(".no-std-box").classList.remove("d-none");
} else {
    displayStudents();
}

function displayStudents() {
    const table = document.querySelector(".table");
    const tBody = document.querySelector(".student-table-body");
    for (let std of students) {
        tBody.innerHTML += `<tr>
                        <td>${std.rollNo}</td>
                        <td>${std.fullName}</td>
                        <td>${std.courseName}</td>
                        <td>${std.email}</td>
                        <td>${std.cnic}</td>
                        <td><i class="fa-solid fa-trash btn" onclick="removeFile()"></i></td>

                    </tr>`;
    }
    table.classList.remove("d-none");
}

