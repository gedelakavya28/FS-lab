class Student {
  constructor(name, rollNumber, department, cgpa) {
    this.name = name;
    this.rollNumber = rollNumber;
    this.department = department;
    this.cgpa = Number(cgpa).toFixed(2);
  }
}

const generateBtn = document.getElementById('generateBtn');
const profileContainer = document.getElementById('profileContainer');

generateBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const rollNumber = document.getElementById('rollNumber').value.trim();
  const department = document.getElementById('department').value.trim();
  const cgpa = document.getElementById('cgpa').value.trim();

  if (!name || !rollNumber || !department || !cgpa) {
    alert('Please fill in all student details.');
    return;
  }

  const student = new Student(name, rollNumber, department, cgpa);
  profileContainer.innerHTML = '';

  const profileCard = document.createElement('div');
  profileCard.className = 'profile-card';

  const heading = document.createElement('h2');
  heading.textContent = 'Student Profile';
  profileCard.appendChild(heading);

  const details = [
    ['Name', student.name],
    ['Roll No', student.rollNumber],
    ['Department', student.department],
    ['CGPA', student.cgpa]
  ];

  details.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'detail-row';

    const labelEl = document.createElement('span');
    labelEl.className = 'label';
    labelEl.textContent = label + ' :';

    const valueEl = document.createElement('span');
    valueEl.className = 'value';
    valueEl.textContent = value;

    row.appendChild(labelEl);
    row.appendChild(valueEl);
    profileCard.appendChild(row);
  });

  profileContainer.appendChild(profileCard);
});

generateBtn.click();
