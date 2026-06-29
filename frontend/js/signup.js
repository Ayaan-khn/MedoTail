// ===========================================
// SIGNUP PAGE
// ===========================================

const signupForm = document.getElementById("signupForm");

const displayName = document.getElementById("displayName");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

signupForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (
        displayName.value.trim() === "" ||
        username.value.trim() === "" ||
        email.value.trim() === "" ||
        password.value.trim() === "" ||
        confirmPassword.value.trim() === ""
    ) {

        alert("Please fill in all fields.");
        return;
    }

    if (password.value !== confirmPassword.value) {

        alert("Passwords do not match.");
        return;
    }

    // Backend signup will go here later
    alert("Account created (Frontend Demo)");

});

const loginLink = document.getElementById("loginLink");

loginLink.addEventListener("click", (event) => {

    event.preventDefault();

    window.location.href = "login.html";

});