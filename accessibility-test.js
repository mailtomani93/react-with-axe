const axe = require('axe-core');

axe.run(document, {
  // Optional configuration for Axe
  // Example: ignore certain rules 
  // rules: [
  //   { id: 'color-contrast', enabled: false } 
  // ]
}).then(results => {
  if (results.violations.length > 0) {
    console.error("Accessibility issues found:", results.violations);
    process.exit(1); // Fail the build
  } else {
    console.log("No accessibility issues found.");
  }
});
