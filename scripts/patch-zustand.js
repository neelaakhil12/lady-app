const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../node_modules/zustand/esm/middleware.mjs');

if (fs.existsSync(targetFile)) {
  console.log('Patching zustand/esm/middleware.mjs...');
  let content = fs.readFileSync(targetFile, 'utf8');
  
  // Replace import.meta.env with process.env
  const patchedContent = content.replace(/import\.meta\.env/g, 'process.env');
  
  if (content !== patchedContent) {
    fs.writeFileSync(targetFile, patchedContent);
    console.log('Successfully patched zustand!');
  } else {
    console.log('zustand already patched or no import.meta.env found.');
  }
} else {
  console.log('zustand/esm/middleware.mjs not found, skipping patch.');
}
