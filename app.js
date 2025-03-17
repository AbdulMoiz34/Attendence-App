const notyf = new Notyf();
const isLogin = localStorage.getItem("isLogin");
if (isLogin === "true") {
    location = "/admin";
}
// Toggle Password functionality.
const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#password');

togglePassword.addEventListener("click", () => {
    const type = (passwordInput.type === "password") ? "text" : "password";
    if (type == "password") {
        togglePassword.classList.replace("fa-eye-slash", "fa-eye");
    } else {
        togglePassword.classList.replace("fa-eye", "fa-eye-slash");
    }
    passwordInput.type = type;
});


// check username and password.
const loginHandler = () => {
    const email = "12345";
    const password = "12345";
    const adminEmail = document.querySelector("#username");
    const adminPassword = document.querySelector("#password");
    if (!adminEmail.value.trim()) {
        notyf.error("Please Enter Email.");
    }
    else if (email === adminEmail.value) {
        if (password === adminPassword.value) {
            notyf.success("login succesful.");
            localStorage.setItem("isLogin", true);
            location = "/admin";
        } else {
            notyf.error("Password isn't correct.");
        }
    } else {
        notyf.error("email is not correct.");
    }
}

passwordInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        loginHandler();
    }
})