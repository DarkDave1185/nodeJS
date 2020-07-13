const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

function createHTML(answers) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>


<body>
    <div class="container">
        - [Heading](#project)
            * [Sub-heading](#sub-heading)
                + [Sub-sub-heading](#sub-sub-heading)

    / ${answers.project}
    #${answers.project}
    (Lincense)
    ##Description
    ${answers.description}
    ##Install Instructions 
    ${answers.install}
    ##Usage Information
    ${answers.usage}
    ##Conrtributions
    ${answers.contribute}
    ##Test Instructions
    ${answers.test}
    ##Question Submitted
    ${answers.question}
    GitHub Username: ${answers.username}[GitHub](https://github.com/${answers.username})
    
    <img src="https://img.shields.io/badge/<LABEL>-<${answers.lincense}>-<COLOR>" alt="badge"></img>
  </div>
</body>
</html>`
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
            message: "what are the test instruction for the project?"
        },
        {
            type: "input",
            name: "question",
            message: "What quesitons do oyu have for developer?"
        },
        {
            type: "input",
            name: "username",
            message: "GitHub user name"
        },
    ])
}


promptUser()
    .then(function(answers) {
        const page = createHTML(answers);

        return writeFileAsync("index.html", page);
    })
    .catch(function(err) {
        console.log(err);
    });