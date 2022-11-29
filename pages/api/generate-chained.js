import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `Write me an in depth table of contents for a research paper titled "`; //Please make sure the research paper goes in-depth on the topic and shows that the writer did their research.
const basePromptSuffix = '". Make sure to fit the scientific standard.\n Table of Contents:' // todo: dropdown list zur sprachauswahl implementieren!  in German
const basePromptLanguageSuffix = '" in German.'
const generateAction = async (req, res) => {
    // Run first prompt
const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}${basePromptSuffix}${basePromptSuffix}`,
    temperature: 0.96,
    max_tokens: 250,
    frequency_penalty: 0.5,
    presence_penalty: -0.5, //noch versuchen für abwechslung und neue ideen
  });
  
const basePromptOutput = baseCompletion.data.choices.pop();
console.log(basePromptOutput)
// in German nicht mehr drin überall!
const secondPromptPrefixChainTextFromToC = 
`
Take the table of contents and title of the research paper below and generate a detailed research paper.

Title: ${req.body.userInput}

Table of Contents: ${basePromptOutput.text}
\n
Research Paper:
`
console.log(secondPromptPrefixChainTextFromToC)
const chainCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPromptPrefixChainTextFromToC}`,
    temperature: 0.96,
    max_tokens: 750,
    frequency_penalty: 0.5,
    presence_penalty: -0.5, //noch versuchen für abwechslung und neue ideen
  });
  
const secondPromptOutput = chainCompletion.data.choices.pop();
console.log(secondPromptOutput)
res.status(200).json({ output: secondPromptOutput});
};
export default generateAction;