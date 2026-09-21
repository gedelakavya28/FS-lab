const fs = require('fs');
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Get filename from user
rl.question('Enter filename: ', (filename) => {

    // Get initial content
    rl.question('Enter content: ', (content) => {

        // Create and write file
        fs.writeFileSync(filename, content);
        console.log('File created and written successfully!');

        // Read file contents
        let data = fs.readFileSync(filename, 'utf8');
        console.log('Original content:', data);

        // Get additional content
        rl.question('Enter additional content: ', (additional) => {

            // Append content
            fs.appendFileSync(filename, '\n' + additional);
            console.log('Content appended successfully!');

            // Display final contents
            let finalData = fs.readFileSync(filename, 'utf8');
            console.log('Final contents:\n' + finalData);

            rl.close();
        });
    });
});