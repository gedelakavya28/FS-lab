const fs = require('fs');

// 1. Create / Write file
fs.writeFileSync('sample.txt', 'Hello! Welcome to ANITS College.');
console.log('sample.txt created.');

// 2. Read file
let data = fs.readFileSync('sample.txt', 'utf8');
console.log('File content:', data);

// 3. Append data
fs.appendFileSync('sample.txt', '\nThis is Node.js file handling.');
console.log('Data appended.');

// 4. Read updated file
data = fs.readFileSync('sample.txt', 'utf8');
console.log('Updated content:', data);

// 5. Create a new file
fs.writeFileSync(
    'renameDelete.txt',
    'This file is for rename and delete operations.'
);
console.log('renameDelete.txt created.');

// 6. Rename the file
fs.renameSync('renameDelete.txt', 'renamedFile.txt');
console.log('renameDelete.txt renamed to renamedFile.txt.');

// 7. Delete the renamed file
fs.unlinkSync('renamedFile.txt');
console.log('renamedFile.txt deleted.');