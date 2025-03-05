const notyf = new Notyf();
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
    const email = "abc";
    const password = "abc";
    const adminEmail = document.querySelector("#username");
    const adminPassword = document.querySelector("#password");
    if (!adminEmail.value.trim()) {
        notyf.error("Please Enter Email.");
    }
    else if (email === adminEmail.value) {
        if (password === adminPassword.value) {
            notyf.success("login succesful.");
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