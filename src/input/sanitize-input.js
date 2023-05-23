
// No need to sanitize password input as it is a sensitive field
  
 // Function to sanitize input
 function sanitizeInput(value) {
    // Remove leading/trailing white spaces
    const sanitizedValue = value.trim();
    // Replace special characters to prevent SQL injection and XSS
    const sanitizedValueWithoutSpecialChars = sanitizedValue.replace(/[<>&'"]/g, "");
    return sanitizedValueWithoutSpecialChars;
  }

document.addEventListener("DOMContentLoaded", () => {
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
  
    // Sanitize inputs on blur event
    firstNameInput.addEventListener("blur", () => {
      firstNameInput.value = sanitizeInput(firstNameInput.value);
    });
  
    lastNameInput.addEventListener("blur", () => {
      lastNameInput.value = sanitizeInput(lastNameInput.value);
    });
  
    emailInput.addEventListener("blur", () => {
      emailInput.value = sanitizeInput(emailInput.value);
    });
  
    
  });
  