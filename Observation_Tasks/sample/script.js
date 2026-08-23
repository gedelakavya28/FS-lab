class Student {
    constructor(name, roll, dept, cgpa) {
        this.name = name;
        this.roll = roll;
        this.dept = dept;
        this.cgpa = cgpa;
    }
}

function displayStudent() {
    let student = new Student(
        document.getElementById("name").value,
        document.getElementById("roll").value,
        document.getElementById("dept").value,
        document.getElementById("cgpa").value
    );

    let profile = document.getElementById("profile");

    profile.innerHTML = `
        <h3>Student Profile</h3>
        <p>Name : ${student.name}</p>
        <p>Roll No : ${student.roll}</p>
        <p>Department : ${student.dept}</p>
        <p>CGPA : ${student.cgpa}</p>
    `;
}