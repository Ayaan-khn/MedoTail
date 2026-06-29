// ===========================================
// LOGIN PAGE
// ===========================================

const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

loginForm.addEventListener("submit", (event) => {

    if (email.value.trim() === "") {
        event.preventDefault();
        alert("Please enter your email or username.");
        email.focus();
        return;
    }

    if (password.value.trim() === "") {
        event.preventDefault();
        alert("Please enter your password.");
        password.focus();
    }

    // Allow the browser to submit the form to Flask.
});

password.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        loginForm.requestSubmit();
    }

});