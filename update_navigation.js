const fs = require('fs');
const path = require('path');

// Function to update the navigation in a file
function updateNavigation(filePath) {
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update the logo section to ensure NeuroNexus has a link to index.html
    // For pages in the root directory
    if (filePath.includes('index.html') || filePath.includes('404.html')) {
      content = content.replace(
        /<div class="logo">\s*<i class="fas fa-project-diagram"><\/i>\s*<span>([^<]+)<\/span>\s*<\/div>/g,
        '<div class="logo">\n            <a href="index.html">\n                <i class="fas fa-project-diagram"></i>\n                <span>NeuroNexus</span>\n            </a>\n        </div>'
      );
    } 
    // For pages in subdirectories
    else {
      content = content.replace(
        /<div class="logo">\s*<i class="fas fa-project-diagram"><\/i>\s*<span>([^<]+)<\/span>\s*<\/div>/g,
        '<div class="logo">\n            <a href="../index.html">\n                <i class="fas fa-project-diagram"></i>\n                <span>NeuroNexus</span>\n            </a>\n        </div>'
      );
      
      // Also handle cases where there's already an <a> tag but with different text
      content = content.replace(
        /<div class="logo">\s*<a href="[^"]+">[\s\S]*?<i class="fas fa-project-diagram"><\/i>\s*<span>([^<]+)<\/span>\s*<\/a>\s*<\/div>/g,
        '<div class="logo">\n            <a href="../index.html">\n                <i class="fas fa-project-diagram"></i>\n                <span>NeuroNexus</span>\n            </a>\n        </div>'
      );
    }
    
    // Update any other mentions of Smart Checkout System or TapGo Checkout in the content
    content = content.replace(/Smart Checkout System/g, 'NeuroNexus Smart Checkout System');
    content = content.replace(/TapGo Checkout/g, 'NeuroNexus');
    
    // Update footer logo sections where applicable
    if (content.includes('footer-logo')) {
      if (filePath.includes('index.html') || filePath.includes('404.html')) {
        content = content.replace(
          /<div class="footer-logo">\s*<i class="fas fa-project-diagram"><\/i>\s*<span>([^<]+)<\/span>\s*<\/div>/g,
          '<div class="footer-logo">\n                <a href="index.html">\n                    <i class="fas fa-project-diagram"></i>\n                    <span>NeuroNexus</span>\n                </a>\n            </div>'
        );
      } else {
        content = content.replace(
          /<div class="footer-logo">\s*<i class="fas fa-project-diagram"><\/i>\s*<span>([^<]+)<\/span>\s*<\/div>/g,
          '<div class="footer-logo">\n                <a href="../index.html">\n                    <i class="fas fa-project-diagram"></i>\n                    <span>NeuroNexus</span>\n                </a>\n            </div>'
        );
      }
    }
    
    // Update copyright text
    content = content.replace(/&copy; 2023 ([^<.]+)/g, '&copy; 2023 NeuroNexus');
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
    
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

// Process all HTML files in the project
function processDirectory(directory) {
  const items = fs.readdirSync(directory);
  
  items.forEach(item => {
    const itemPath = path.join(directory, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      processDirectory(itemPath);
    } else if (stats.isFile() && itemPath.endsWith('.html')) {
      updateNavigation(itemPath);
    }
  });
}

// Start processing from the current directory
console.log('Starting navigation update...');
processDirectory('.');
console.log('Navigation update completed!'); 