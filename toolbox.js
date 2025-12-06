const { Select, Input } = require('enquirer');
const sqlInjections = require('./sqlInjection.js');
const exif = require('./exif.js');
const url = require('./url.js');
const xss = require('./xss.js');

async function promptForTools(choicesArg) {
  const prompt = new Select({
    name: 'tools',
    message: 'Use arrow keys and Enter to select the tool you want to use:',
    choices: choicesArg
  });

  try {
    const selected = await prompt.run();
    return selected
  } catch (err) {
    console.error('Prompt cancelled or failed:', err);
  }
}

async function init(){
    const choices = [
        { name: 'EXIF', message: 'EXIF Data Reader' },
        { name: 'SQL', message: 'SQL Injections' },
        { name: 'URL', message: 'URL Encode / Decode' },
        { name: 'XSS', message: 'XSS Injections' }
    ]
    let tool = await promptForTools(choices)
    handleTools(tool)
}

async function textPrompt(toolSet, toolToRun, question){
    const inputPrompt = new Input({
        name: 'response',
        message: question
    });
    inputPrompt.run().then(response => runTextBasedTool(toolSet, toolToRun, response)).catch(console.error);
}

async function runTextBasedTool(toolSet, toolToRun, response){
    console.log(toolSet, toolToRun, response)
    if(toolSet === 'EXIF'){
        exif[toolToRun](response)
    }
    else if(toolSet === 'URL'){
        url[toolToRun](response)
    }
}

async function handleTools(selected){
    if(selected === 'XSS'){
        const exifChoices = [
            { name: 'basic', message: 'Basic XSS Payloads' },
            { name: 'contextBypass', message: 'Context Bypass payloads' },
            { name: 'eventHandler', message: 'Event Handlers' },
            { name: 'url', message: 'URL / Href options' },
            { name: 'polyglot', message: 'Polyglot' }
        ]
        let tool = await promptForTools(exifChoices)
        xss.utils.print(tool)
    }
    else if(selected === 'SQL'){
        const exifChoices = [
            { name: 'basic', message: 'Basic Payloads' },
            { name: 'loginBypass', message: 'Login Bypass' },
            { name: 'unionBased', message: 'Union based injections' },
            { name: 'errorBased', message: 'Error based Injections' },
            { name: 'blind', message: 'Blind Injections' },
            {name: 'commentSyntax', message: 'Comment Syntax'}
        ]
        let tool = await promptForTools(exifChoices)
        sqlInjections.utils.print(tool)
    }
    else if(selected === 'EXIF'){
        const exifSecondChoice = [
            { name: 'getBasic', message: 'Basic EXIF info' },
            { name: 'getFull', message: 'Full Exif info' }
        ]
        let tool = await promptForTools(exifSecondChoice)
        const question = "File path to img"
        textPrompt(selected, tool, question)
    }
    else if(selected === 'URL'){
        const urlSecondChoice = [
            { name: 'encode', message: 'Encode text to url' },
            { name: 'decode', message: 'Decode text from url' }
        ]
        let tool = await promptForTools(urlSecondChoice)
        const question = "text to encode / decode"
        textPrompt(selected, tool, question)
    }
}

init();
