const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
/*added array to hardcode choices*/
const licenses = {
    "Apache License v2.0": "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    "GNU General Public License v3.0": "[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)",
    "MIT License": "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
}

function createHTML(answers) {
    return `#(header)
# ${answers.project}
${answers.license}

## Description
${answers.description}
## Table of Contents
- [Contributions](#Contributions)
- [Usage Information](#Usage-Information)
- [License](#License-Information)
- [Test Instructions](#Test-Instructions)
- [Question Submitted](#Question-Submited)
## Install Instructions 
${answers.install}
## Usage Information
${answers.usage}
## License Information
${answers.license}
>**Click on th Link for License Information:**
- Apache License v2.0 - https://www.apache.org/licenses/LICENSE-2.0
- GNU General Public License v3.0 - http://www.gnu.org/licenses/#GPL
- MIT License - https://mit-license.org/
## Contributions
${answers.contribute}
## Test Instructions
${answers.test}
## Question Submited
#### By: ${answers.email}
${answers.question}
#### GitHub Username: ${answers.username}
##### [GitHub Link](https://github.com/${answers.username})
`
}

function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "project",
            message: "What is your project title?"
        },
        {
            type: "input",
            name: "description",
            message: "What does your project do?"
        },
        {
            type: "input",
            name: "install",
            message: "How can this be installed?"
        },
        {
            type: "input",
            name: "usage",
            message: "What should the user know before use?"
        },
        {
            type: "list",
            name: "license",
            message: "Which of the major licenses are being used?",
            choices: [
                "Apache License v2.0",
                "GNU General Public License v3.0",
                "MIT License"
            ]
        },
        {
            type: "input",
            name: "contribute",
            message: "How can someone contriute to the project?"
        },
        {
            type: "input",
            name: "test",
            message: "What are the test instruction for the project?"
        },
        {
            type: "input",
            name: "question",
            message: "What quesitons do you have for developer?"
        },
        {
            type: "input",
            name: "username",
            message: "GitHub user name"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?"
        }
    ])
}


promptUser()
    .then(function(answers) {
        /*added variable to swap answer to array answer in licenses*/
        answers.license = licenses[answers.license]
            /*make sure createHTML is below and changes that need to be made*/
        const page = createHTML(answers);
        /*check answers to questions*/
        console.log(answers)
        return writeFileAsync("README.md", page);
    })
    .catch(function(err) {
        console.log(err);
    });