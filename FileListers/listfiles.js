#!/usr/bin/env node
const fs = require('fs');
const path = process.argv[2];

if (!path) {
  console.log('Usage: listfiles /path/to/directory');
  process.exit(1);
}

try {
  const files = fs.readdirSync(path);
  files.forEach(file => console.log(file));
} catch (err) {
  console.error('Error reading directory:', err.message);
}
