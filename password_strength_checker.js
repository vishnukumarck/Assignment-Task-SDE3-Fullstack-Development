// Function to check if a password is strong
function minimumStepsToMakePasswordStrong(password) {
    let steps = 0;

    // Check if password length is between 6 and 20 characters
    const lengthDiff = Math.max(0, Math.abs(password.length - 13) - 7);
    steps += lengthDiff;

    // Check if password contains at least one lowercase letter, one uppercase letter, and one digit
    const Pass_LUD = (!/[a-z]/.test(password) ? 1 : 0) + (!/[A-Z]/.test(password) ? 1 : 0) + (!/\d/.test(password) ? 1 : 0);
    steps += Pass_LUD;

    // Check if password contains three repeating characters in a row
    let repeat = 0;
    for (let i = 2; i < password.length; i++) {
        repeat += password[i] === password[i - 1] && password[i - 1] === password[i - 2] ? 1 : 0;
    }
    steps += repeat;

    // If password is already strong return 0 and else return the minimum number of steps required to make password strong.
    // return steps;
    return (lengthDiff === 0 && Pass_LUD === 0 && repeat === 0) ? steps : Math.max(lengthDiff, Pass_LUD, repeat );
    // return Math.min(steps, lengthDiff);

}

// Unit tests
// Test case 1
let password1 = "a";
console.log(minimumStepsToMakePasswordStrong(password1)); // Output: 5

// Test case 2
let password2 = "aA1";
console.log(minimumStepsToMakePasswordStrong(password2)); // Output: 3

// Test case 3
let password3 = "1337C0d3";
console.log(minimumStepsToMakePasswordStrong(password3)); // Output: 0