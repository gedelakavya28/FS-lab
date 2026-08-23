class Student {
  constructor(name, rollNumber, department, cgpa) {
    this.name = name;
    this.rollNumber = rollNumber;
    this.department = department;
    this.cgpa = cgpa;
  }
}

const studentForm = document.getElementById('studentForm');
const profileOutput = document.getElementById('profileOutput');

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(studentForm);
  const student = new Student(
    formData.get('name').trim(),
    formData.get('rollNumber').trim(),
    formData.get('department').trim(),
    Number(formData.get('cgpa')).toFixed(2)
  );

  profileOutput.replaceChildren();

  const heading = document.createElement('h2');
  heading.textContent = 'Student Profile';

  const details = document.createElement('dl');
  const profileDetails = [
    ['Name', student.name],
    ['Roll No', student.rollNumber],
    ['Department', student.department],
    ['CGPA', student.cgpa]
  ];

  profileDetails.forEach(([label, value]) => {
    const term = document.createElement('dt');
    term.textContent = label;
    const description = document.createElement('dd');
    description.textContent = value;
    details.append(term, description);
  });

  profileOutput.append(heading, details);
});
