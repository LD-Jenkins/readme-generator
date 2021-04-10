const inq = require('inquirer');
const fs = require('fs');

let title = "";
let desc = "";
let inst = "";
let usage = "";
let lic = "";
let contr = "";
let test = "";
let gituser = "";
let email = "";

const licArr = {
    "None": "",
    "MIT License": "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    "GNU Lesser General Public License v3.0": "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)",
    "Mozilla Public License 2.0": "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
    "GNU Affero General Public License v3.0": "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)",
    "The Unlicense": "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
    "Apache License 2.0": "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    "GNU General Public License v3.0": "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
}

const licNameArr = [];
for (const item in licArr) {
    licNameArr.push(item);
}
// console.log(licNameArr);



inq.prompt([
    {
        name: "title",
        message: "Project title: ",
        default: "Project Title"
    },
    {
        name: "desc",
        message: "Describe your project: ",
        default: "Project description goes here."
    },
    {
        name: "inst",
        message: "Installation instructions: ",
        default: "Installation instructions go here."
    },
    {
        name: "usage",
        message: "Usage instructions: ",
        default: "Usage instructions go here"
    },
    {
        name: "test",
        message: "Testing instructions: ",
        default: "Testing instructions go here."
    },
    {
        name: "contr",
        message: "How to contribute to your project: ",
        default: "Information on how to contribute to your project goes here."
    },
    {
        name: "gituser",
        message: "GitHub Username: ",
        default: "None provided"
    },
    {
        name: "email",
        message: "Your email: ",
        default: "None provided"
    },
    {
        type: "list",
        name: "license",
        message: "License used: ",
        choices: licNameArr,
    },
    {
        name: "file",
        message: "File to save to (do not include extension, README.md by default): ",
        default: "README"
    }
])
.then(ans => {
    let usrlic = licArr[ans.license];
    let licInfo = ans.license === "" ? "This project is not currently using a license." : 
`This project is using ${ans.license}.
    Click the badge at the top right of this README for more info.`;

    let mdTemplate = 
`# <p>${ans.title}<span style='float: right;'>${usrlic}</span></p>


## Project Description

    ${ans.desc}

## Table of Contents

*   [Installation](#installation)
*   [Usage](#usage)
*   [Testing](#testing)
*   [Licenses](#licenses)
*   [Contribute](#contribute)
*   [Questions](#questions)

## Installation

    ${ans.inst}

## Usage

    ${ans.usage}

## Testing

    ${ans.test}

## Licenses

    ${licInfo}

## Contribute

    ${ans.contr}

## Questions

    For any questions you may find me at:

        GitHub: ${ans.gituser}
        Email: ${ans.email}`;
        
    // fs.writeFileSync('example.md', mdTemplate);
    fs.writeFile(`${ans.file}.md`, mdTemplate, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
});



// fs.writeFile('example.md', mdTemplate, (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
// })

