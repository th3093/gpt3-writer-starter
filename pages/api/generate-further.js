import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `Write a research paper titled "`; //Please make sure the research paper goes in-depth on the topic and shows that the writer did their research.
const basePromptSuffix = '" in German. \n1.' // todo: dropdown list zur sprachauswahl implementieren!

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`${req.textframe.apiOutput}`)
    if (req.textframe.apiOutput != None){
        var prompttmp = `${req.textframe.apiOutput}` 
    }
    else {
        var prompttmp = ``
    }

const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}${basePromptSuffix}${prompttmp}`,
    temperature: 0.96,
    max_tokens: 250,
    frequency_penalty: 0.5,
    presence_penalty: -0.5, //noch versuchen für abwechslung und neue ideen
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();
  res.status(200).json({ output: basePromptOutput});
};

export default generateAction;