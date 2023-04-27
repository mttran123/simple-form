/* Name: Mai Tran
Due date: March 26, 2023
Section: CST8285
Lab number: 304
File name: script.js
Description: This javascript file is to validate the form before submission.
*/

let email = document.getElementById("email");
let loginname = document.getElementById("loginname");
let pass = document.getElementById("pass");
let pass2 = document.getElementById("pass2");
let newsletter = document.getElementById("newsletter");
let terms = document.getElementById("terms");
let form = document.getElementById("form");


const errorEmail = document.createElement('p');
errorEmail.setAttribute("class", "warning");
document.querySelectorAll(".form-group")[0].append(errorEmail);

const errorLogin = document.createElement('p');
errorLogin.setAttribute("class", "warning");
document.querySelectorAll(".form-group")[1].append(errorLogin);

const errorPass = document.createElement('p');
errorPass.setAttribute("class", "warning");
document.querySelectorAll(".form-group")[2].append(errorPass);

const errorPass2 = document.createElement('p');
errorPass2.setAttribute("class", "warning");
document.querySelectorAll(".form-group")[3].append(errorPass2);

const errorTerm = document.createElement('p');
errorTerm.setAttribute("class", "form-check-label");
document.querySelectorAll(".form-check")[1].append(errorTerm);

let defaultMessage = "";

// add style to error warnings
let warning = document.getElementsByClassName("warning");
for(var i=0; i<warning.length; i++){
    warning[i].style.color = "red";
  }

let checkForm = document.getElementsByClassName("form-check-label");
for(var i=0; i<checkForm.length; i++) {
    checkForm[i].style.display = "inline-block";
}

// form is validated when submit button is clicked
form.addEventListener("submit", function submit(event) {
    event.preventDefault();
    let valid = true;       //global validation 

    if (!validateEmail()) {
        errorEmail.textContent = "x Email address should be non-empty with the format xyz@xyz.com";
        errorEmail.style.color = "red";
        email.style.border = "1px solid red";
        valid = false;      
        email.addEventListener("input", () => {
            errorEmail.textContent = defaultMessage;
            email.style.border = null;
        }) 
    }
    if (!validateLogin()) {
        errorLogin.textContent = "x Username should be non-empty and within 20 character long.";
        loginname.style.border = "1px solid red";
        valid = false;  
        loginname.addEventListener("input", () => {
            errorLogin.textContent = defaultMessage;
            loginname.style.border = null;
        })  
    }
    if (!validatePassword()) {
        errorPass.textContent = "x Password should be at least 6 characters: 1 uppercase, 1 lowercase";
        pass.style.border = "1px solid red";
        valid = false;
        pass.addEventListener("input", () => {
            errorPass.textContent = defaultMessage;
            pass.style.border = null;
        })  
    }

    if (!validatePass2()) {
        errorPass2.textContent = "x Please retype password";
        pass2.style.border = "1px solid red";
        valid = false;
        pass2.addEventListener("input", () => {
            errorPass2.textContent = defaultMessage;
            pass2.style.border = null;
        })  
    }

    if (!validateTerm()) {
        errorTerm.textContent = "x Please accept terms and conditions";
        errorTerm.style.color = "red";
        valid = false;
        terms.addEventListener("change", () => {
            errorTerm.textContent = defaultMessage;
        })
    }

    if (validateEmail() && validateLogin() && validatePassword() && validatePass2() && validateTerm()) {
        loginname.value = loginname.value.trim().toLowerCase();         
        form.submit(); 
        alert("Data is valid!!");
        valid = true;
    }
    return valid;
})

// reset the form when reset button is clicked
form.addEventListener("reset", function reset() {
    errorEmail.textContent = defaultMessage;
    errorLogin.textContent = defaultMessage;
    errorPass.textContent = defaultMessage;
    errorPass2.textContent = defaultMessage;
    errorTerm.textContent = defaultMessage;

    email.style.border = null;
    loginname.style.border = null;
    pass.style.border = null;
    pass2.style.border = null;
})

// pop up alert when newsletter box is checked
newsletter.addEventListener("change", function () {
    if(newsletter.checked) {
        alert("You may receive spam and marketing emails from us.")
    }    
})

// validate email to have correct format
function validateEmail() {
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email.value) && email.value.length >0) {
        return true;
    } else {
        return false;
    }
}

// validate login name which should be non-empty and less than 20 characters long
function validateLogin() {
    let login = loginname.value.trim();
    if (login.length >0 && login.length < 20) {        
        return true;
    } else {
        return false;
    }
}

// function to validate password that should not be empty, should be more than 6 characters and have at least 1 uppercase and 1 lowercase
function validatePassword() {
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (regexPass.test(pass.value)) {
        return true;
    } else {
        return false;
    }
}

// function to validate 2nd password retyped same as first password
function validatePass2() {
    if (pass2.value.length >= 6 && (pass2.value === pass.value)){
        return true;
    } else {
        return false;
    }
}

// function to validate terms and conditions box is checked
function validateTerm() {
    if (terms.checked) {
        return true;
    }
    return false;
}


