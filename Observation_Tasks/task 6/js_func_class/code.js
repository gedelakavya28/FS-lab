class Student {
    constructor(name, rollNo, department) {
        this.name = name;
        this.rollNo = rollNo;
        this.department = department;
    }

    displayDetails() {
        console.log("Name: " + this.name);
        console.log("Roll No: " + this.rollNo);
        console.log("Department: " + this.department);
    }
}

// Creating multiple objects
let student1 = new Student("Ravi", "101", "CSE");
let student2 = new Student("Priya", "102", "ECE");
let student3 = new Student("Arun", "103", "IT");

// Calling the method
student1.displayDetails();
student2.displayDetails();
student3.displayDetails();