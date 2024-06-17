// // Example run-axe.js using axe-core
// const axe = require('axe-core');
// const fs = require('fs');
// const { JSDOM } = require('jsdom');

// const file = process.argv[2]; // Get the filename from command line arguments
// const html = fs.readFileSync(file);
// const { window } = new JSDOM(html);
// // const window = dom.window;
// const { body } = window.document;
// axe.run(body)
//   .then((results) => {
//     if (results.violations.length > 0) {
//       console.error(JSON.stringify(results.violations, null, 2));
//       process.exit(1); // Indicate error
//     } else {
//       console.log('No accessibility violations found!');
//     }
//   })
//   .catch((err) => {
//     console.error('Error running axe:', err);
//     process.exit(1);
//   });
// Example run-axe.js using axe-core
const axe = require("axe-core");
const fs = require("fs");
const { JSDOM } = require("jsdom");

const file = process.argv[2]; // Get the filename from command line arguments

const html = fs.readFileSync(file, "utf8");

const { window } = new JSDOM(html);

// Now run axe within the jsdom context
axe
  .run(window.document.documentElement)
  .then((results) => {
    const criticalError = results.violations.filter(
      (violation) => violation.impact === "critical"
    );
    if (criticalError.length > 0) {
      console.error(JSON.stringify(criticalError, null, 2));
      process.exit(1); // Indicate error
    } else {
      console.log("No accessibility violations found!");
    }
  })
  .catch((err) => {
    console.error("Error running axe:", err);
    process.exit(1);
  });
