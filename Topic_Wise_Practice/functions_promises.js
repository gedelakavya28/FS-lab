// 1. NORMAL FUNCTION
function calculateMarks(m1, m2) {
    return m1 + m2;
}

console.log("Normal Function:", calculateMarks(80, 90));


// 2. ARROW FUNCTION: A function written in a more concise way and does not have its own 'this' context and constructor
const calculateAverage = (total, subjects) => {
    return total / subjects;
};

console.log("Arrow Function:", calculateAverage(170, 2));


// 3. ANONYMOUS FUNCTION: A function without a name and is often assigned to a variable or passed as an argument to another function
const calculateGrade = function (average) {
    if (average >= 90)
        return "A+";
    else if (average >= 75)
        return "A";
    else
        return "B";
};

console.log("Anonymous Function:", calculateGrade(85));


// 4. CALLBACK FUNCTION: A function passed as an argument to another function and is executed after some operation is completed
function displayResult(name, averageCallback) {
    console.log("Student:", name);

    let result = averageCallback(85); // here, the callback function is called with the average marks as an argument

    console.log("Grade:", result);
}

displayResult("Kavya", calculateGrade);


// 5. CALLBACK HELL: Multiple callbacks nested inside each other and can lead to code that is difficult to read and maintain

function getMarks(callback) {
    setTimeout(() => {    //here setTimeOut is a method that is used to delay the execution of a function by a specified amount of time. In this case, it is used to simulate an asynchronous operation that takes 1 second to complete.
        console.log("1. Marks received");
        callback(180);
    }, 1000);
}

function getAverage(total, callback) {
    setTimeout(() => {
        let average = total / 2;
        console.log("2. Average calculated:", average);
        callback(average);
    }, 1000);
}

function getGrade(average, callback) {
    setTimeout(() => {
        let grade = calculateGrade(average);
        console.log("3. Grade calculated:", grade);
        callback(grade);
    }, 1000);
}

getMarks(function (total) {
    getAverage(total, function (average) {
        getGrade(average, function (grade) {
            console.log("Final Grade:", grade);
        });
    });
});


// 6. PROMISE: Promise avoids deeply nested callbacks and it consists of three states: pending, fulfilled, and rejected. It allows chaining of .then() and .catch() and .finally() for better readability and error handling.

function getStudentResult() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            let total = 180;

            if (total > 0)
                resolve(total);
            else
                reject("Marks not available");

        }, 1000);
    });
}

getStudentResult()
    .then((total) => {
        console.log("Promise: Marks received:", total);

        let average = calculateAverage(total, 2);
        return average;
    })
    .then((average) => {
        console.log("Promise: Average:", average);

        let grade = calculateGrade(average);
        return grade;
    })
    .then((grade) => {
        console.log("Promise: Final Grade:", grade);
    })
    .catch((error) => {
        console.log("Error:", error);
    });