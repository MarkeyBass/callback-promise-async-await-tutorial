import fs from 'fs';

// Data to save
const userData = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com',
  hobbies: ['reading', 'coding', 'gaming']
};

// Convert JavaScript object to JSON string
const jsonData = JSON.stringify(userData, null, 2); // null, 2 for pretty formatting

// Write to file with callback
fs.writeFile('user.json', jsonData, 'utf8', (error) => {
  if (error) {
    console.error('Error writing file:', error);
    return;
  }
  console.log('JSON file created successfully!');
});

console.log('This runs immediately, before file is created');
