// ===========================================
// LOGIN PAGE
// ===========================================

const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (email.value.trim() === "") {
        alert("Please enter your email or username.");
        email.focus();
        return;
    }

    if (password.value.trim() === "") {
        alert("Please enter your password.");
        password.focus();
        return;
    }

    // Backend login will go here later
    alert("Login successful (Frontend Demo)");
});

password.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        loginForm.requestSubmit();
    }

});

const signupLink = document.getElementById("signupLink");

signupLink.addEventListener("click", (event) => {

    event.preventDefault();

    window.location.href = "signup.html";

});