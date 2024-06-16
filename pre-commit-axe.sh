#!/bin/sh

# Get list of staged HTML files
FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '\.tsx$')

if [ -z "$FILES" ]; then
    echo "No HTML files staged for commit."
    exit 0
fi

# Run axe-core on each staged HTML file
for FILE in $FILES; do
    echo "Validating accessibility of $FILE..."
    npx axe $FILE 
    
    # Check for violations
    if [ $? -ne 0 ]; then
        echo "Accessibility violations found in $FILE. Commit aborted."
        exit 1
    fi
done

echo "All accessibility checks passed."
