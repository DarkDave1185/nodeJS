const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

function createHTML(answers) {
    return `
- [Heading](#)
    

    
    # ${answers.project}
    
    ## Description
    ${answers.description}
    ## Table of Contents
    - [Contributions](#Contributions)
    - [Usage Information](#Usage-Information)
    - [License](#License)
    - [Test Instructions](#Test-Instructions)
    - [Question Submitted](#Question-Submited)
    ## Install Instructions 
    ${answers.install}
    ## Usage Information
    ${answers.usage}
    ` /*create license question*/
    `
    ## License Information
    ${answer.license}
    ## Contributions
    ${answers.contribute}
    ## Test Instructions
    ${answers.test}
    ## Question Submited
    ${answers.question}
    GitHub Username: ${answers.username}[GitHub](https://github.com/${answers.username})
    
    <img src="https://img.shields.io/badge/<LABEL>-<${answers.lincense}>-<COLOR>" alt="badge"></img>
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
            type: "input",
            name: "contirbute",
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
        const page = createHTML(answers);

        return writeFileAsync("README.md", page);
    })
    .catch(function(err) {
        console.log(err);
    });