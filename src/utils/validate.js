export const formValidation = (name, email, password) => {
    const validationResult = {};
    // console.log(name);
    
    // name validation
    if(name && name.trim()===''){
        validationResult.nameResult = "Name is required";
    } else{
        const isNameValid = /^[A-Za-z]+ [A-Za-z]+$/.test(name);
        if (name && !isNameValid) validationResult.nameResult = "Name Invalid";
    }
    
    // email validation
    if(email.trim()===''){
        validationResult.emailResult = "Email required";
    } else{
        const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        if (!isEmailValid) validationResult.emailResult = "Email Invalid";
    }

    // password validate
    if(password.trim() === ''){
        validationResult.passwordResult = "Password required"
    }
    else {
        const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+-=|\\]).{8,32}$/.test(password);
        if (!isPasswordValid) validationResult.passwordResult = "Password Invalid";
    }

    return validationResult;
};
