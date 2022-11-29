import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `Write a research paper titled "`; //Please make sure the research paper goes in-depth on the topic and shows that the writer did their research.
const basePromptSuffixLanguage = '". \n'; // todo: dropdown list zur sprachauswahl implementieren! in German
const basePromptSuffix = 'Research Paper:';


const generateAction = async (req, res) => {
    console.log(req.body.userInput)
  // Run first prompt

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}${basePromptSuffixLanguage}${basePromptSuffix}`,
    temperature: 0.96,
    max_tokens: 250,
    frequency_penalty: 0.5,
    presence_penalty: -0.5, //noch versuchen für abwechslung und neue ideen
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();
  res.status(200).json({ output: basePromptOutput});
};

export default generateAction;