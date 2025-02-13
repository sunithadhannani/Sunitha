document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting

    let isValid = true;

    // Get input values
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();
    let dob = document.getElementById("dob").value;
    let aadhar = document.getElementById("aadhar").value.trim();
    let pan = document.getElementById("pan").value.trim();

    // Regex patterns
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phonePattern = /^[6-9]\d{9}$/;
    let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let aadharPattern = /^\d{12}$/;
    let panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    // Email Validation
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Invalid email format!";
        isValid = false;
    } else {
        document.getElementById("emailError").textContent = "";
    }

    // Phone Number Validation
    if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").textContent = "Phone must be 10 digits & start with 6-9!";
        isValid = false;
    } else {
        document.getElementById("phoneError").textContent = "";
    }

    // Password Validation
    if (!passwordPattern.test(password)) {
        document.getElementById("passwordError").textContent = "Password must be 8+ chars, include letters, numbers & special chars!";
        isValid = false;
    } else {
        document.getElementById("passwordError").textContent = "";
    }

    // Date of Birth Validation & Age Calculation
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (!dob || age < 18) {
        document.getElementById("dobError").textContent = "You must be at least 18 years old!";
        isValid = false;
    } else {
        document.getElementById("dobError").textContent = "";
        document.getElementById("age").textContent = age;
    }

    // Aadhar Validation
    if (!aadharPattern.test(aadhar)) {
        document.getElementById("aadharError").textContent = "Aadhar must be 12 digits!";
        isValid = false;
    } else {
        document.getElementById("aadharError").textContent = "";
    }

    // PAN Card Validation
    if (!panPattern.test(pan)) {
        document.getElementById("panError").textContent = "PAN must be in format ABCDE1234F!";
        isValid = false;
    } else {
        document.getElementById("panError").textContent = "";
    }

    // If all fields are valid, submit form
    if (isValid) {
        alert("Registration Successful!");
    }
});
