const passField = document.getElementById("password");
const showPass = document.getElementById("showPass");
const emailField = document.getElementById("email_input");
const resultBox = document.getElementById("result");
const form = document.getElementById("loginForm");

showPass.addEventListener("change", () => {
    passField.type = showPass.checked ? "text" : "password";
});

form.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const formData = new FormData(form);

    
    const response = await fetch(form.action, {
        method: "POST",
        body: formData
    });

    const result = await response.text();

    if (result.includes("OK")) {
        window.location.href = "menu.html"; 
    } else {
        resultBox.textContent = result; 
    }
});