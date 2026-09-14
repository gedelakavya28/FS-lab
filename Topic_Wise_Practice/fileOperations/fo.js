const fs = require('fs');

// 1. Write/Create file
fs.writeFileSync('sample.txt', 'Hello! Welcome to ANITS College.');
console.log('File created and data written.');

// 2. Read file
let data = fs.readFileSync('sample.txt', 'utf8');
console.log('File content:', data);

// 3. Append data
fs.appendFileSync('sample.txt', '\nThis is Node.js file handling.');
console.log('Data appended.');

// 4. Read updated file
data = fs.readFileSync('sample.txt', 'utf8');
console.log('Updated content:', data);

// 5. Rename file
fs.renameSync('sample.txt', 'newSample.txt');
console.log('File renamed.');

// 6. Delete file
fs.unlinkSync('newSample.txt');
console.log('File deleted.');