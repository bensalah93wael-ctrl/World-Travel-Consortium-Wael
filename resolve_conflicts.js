const fs = require('fs');
const filePath = process.argv[2];
if (!filePath) {
    console.error('Please provide a file path');
    process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// The markers look like:
// // [block2]
// 

// We want to keep [block2].
// Note: Some blocks might not have a newline after the marker or before the marker.
// Let's use a more robust regex.

const regex = /<<<<<<< HEAD\r?\n([\s\S]*?)\r?\n=======\r?\n([\s\S]*?)\r?\n>>>>>>> .*\r?\n?/g;

// If the regex above doesn't match everything (e.g. if the markers are at the very end of the file without trailing newline)
// we might need to adjust. But let's try this.

let newContent = content.replace(regex, (match, p1, p2) => {
    return p2 + '\n';
});

// One more pass for any remaining markers that might have slightly different spacing
const regex2 = /<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n([\s\S]*?)>>>>>>> .*/g;
newContent = newContent.replace(regex2, (match, p1, p2) => {
    return p2;
});

fs.writeFileSync(filePath, newContent);
console.log('Conflicts resolved in ' + filePath);
