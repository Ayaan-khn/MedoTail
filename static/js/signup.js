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

    if (
        displayName.value.trim() === "" ||
        username.value.trim() === "" ||
        email.value.trim() === "" ||
        password.value.trim() === "" ||
        confirmPassword.value.trim() === ""
    ) {
        event.preventDefault();
        alert("Please fill in all fields.");
        return;
    }

    if (password.value !== confirmPassword.value) {
        event.preventDefault();
        alert("Passwords do not match.");
        confirmPassword.focus();
        return;
    }

    // Validation passed.
    // The browser will now submit the form to:
    // POST /auth/signup
});