// Student marks stored in an array
const marks = [85, 90, 78, 88, 95];
const passMark = 40;

function displayMarks(markList) {
    console.log("Student marks:", markList.join(", "));
}

function calculateTotal(markList) {
    return markList.reduce((total, mark) => total + mark, 0);
}

function calculateAverage(markList) {
    if (markList.length === 0) {
        return 0;
    }

    return calculateTotal(markList) / markList.length;
}

function findHighest(markList) {
    return Math.max(...markList);
}

function findLowest(markList) {
    return Math.min(...markList);
}

function countPassed(markList, minimumMark) {
    return markList.filter((mark) => mark >= minimumMark).length;
}

function addMark(markList, mark) {
    if (mark >= 0 && mark <= 100) {
        markList.push(mark);
    } else {
        console.log("Please enter a mark between 0 and 100.");
    }
}

function displayReport(markList) {
    displayMarks(markList);
    console.log("Total marks:", calculateTotal(markList));
    console.log("Average marks:", calculateAverage(markList).toFixed(2));
    console.log("Highest mark:", findHighest(markList));
    console.log("Lowest mark:", findLowest(markList));
    console.log("Students passed:", countPassed(markList, passMark));
    console.log("Students failed:", markList.length - countPassed(markList, passMark));
}

console.log("Initial Report");
displayReport(marks);

addMark(marks, 92);

console.log("\nReport After Adding a Mark");
displayReport(marks);