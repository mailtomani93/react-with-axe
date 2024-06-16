const axe = require('axe-core');
const glob = require('glob');
const fs = require('fs').promises; 

const htmlFilePattern = './src/**/*.html'; // Adjust to match your project structure

async function runAxe(filePath) {
  try {
    const html = await fs.readFile(filePath, 'utf-8');

    // Create a jsdom instance with the HTML content
    const { window } = new JSDOM(html, {
      // Options for jsdom (e.g., URL for relative resources) 
      url: 'http://localhost/', // Important for accurate analysis 
    });

    // Now run axe within the jsdom context
    const results = await axe.run(window.document.documentElement); 

    if (results.violations.length > 0) {
      console.error(`Accessibility violations found in ${filePath}:`);
      results.violations.forEach((violation) => {
        console.error(violation.help);
        console.error(violation.nodes.map((node) => node.html));
      });
      return false;
    }
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error);
    return false;
  }
  return true;
}


async function main() {
  const files = glob.sync(htmlFilePattern);

  if (files.length === 0) {
    console.log('No HTML files found to validate.');
    process.exit(0);
  }

  const results = await Promise.all(files.map(runAxe));
  const hasErrors = results.some((result) => !result);

  if (hasErrors) {
    console.error('Accessibility checks failed. Please fix the issues before committing.');
    process.exit(1); 
  } else {
    console.log('Accessibility checks passed!');
    process.exit(0); 
  }
}

main();
