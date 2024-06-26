document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".step");
    const nextButtons = document.querySelectorAll(".btn-next");
    const prevButtons = document.querySelectorAll(".btn-prev");
    const formSteps = document.querySelectorAll(".form-step");
    let currentStep = 0;

    // Initialize the first step as active
    formSteps[currentStep].classList.add("active");
    steps[currentStep].classList.add("active");

    nextButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (validateForm(currentStep)) {
                formSteps[currentStep].classList.remove("active");
                steps[currentStep].classList.remove("active");
                currentStep++;
                formSteps[currentStep].classList.add("active");
                steps[currentStep].classList.add("active");
            }
        });
    });

    prevButtons.forEach((button) => {
        button.addEventListener("click", () => {
            formSteps[currentStep].classList.remove("active");
            steps[currentStep].classList.remove("active");
            currentStep--;
            formSteps[currentStep].classList.add("active");
            steps[currentStep].classList.add("active");
        });
    });

    function validateForm(step) {
        const inputs = formSteps[step].querySelectorAll("input");
        let valid = true;

        inputs.forEach((input) => {
            if (input.hasAttribute("required") && !input.value.trim()) {
                showErrorMessage(input, "This field is required.");
                valid = false;
            } else {
                hideErrorMessage(input);
            }

            if (input.type === "email" && !validateEmail(input.value.trim())) {
                showErrorMessage(input, "Please enter a valid email address in small letters.");
                valid = false;
            }

            if (input.type === "tel" && !validatePhoneNumber(input.value.trim())) {
                showErrorMessage(input, "Please enter a valid phone number in the format +XX-XXXXXXXXXX.");
                valid = false;
            }
        });

        return valid;
    }

    function validatePhoneNumber(phoneNumber) {
        const re = /^\+?\d+(?:-\d+){0,1}$/;
        return re.test(phoneNumber);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.com$/;
        return re.test(email);
    }

    function showErrorMessage(input, message) {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = message;

        const formGroup = input.parentElement;
        formGroup.appendChild(errorMessage);
    }

    function hideErrorMessage(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector(".error-message");
        if (errorMessage) {
            formGroup.removeChild(errorMessage);
        }
    }
});