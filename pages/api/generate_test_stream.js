import { Configuration, OpenAIApi } from 'openai';
import { SSE } from 'sse.js';

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

  var source = new SSE(
    "https://api.openai.com/v1/models/text-davinci-003/completions",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      },
      method: "POST",
      payload: JSON.stringify({
        //model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}${basePromptSuffixLanguage}${basePromptSuffix}`,
        temperature: 0.96,
        max_tokens: 250,
        frequency_penalty: 0.5,
        presence_penalty: -0.5,
        stream: true,
        stop: ["\n\n"],
      }),
    }
  );

  source.addEventListener("message", function (e) {
    // Assuming we receive JSON-encoded data payloads:
    console.log(e.data);
    //var payload = JSON.parse(e.data);
    res.status(200).json({output: payload});
    console.log(payload);
  });
  //const basePromptOutput = baseCompletion.data;
  //res.status(200).json({ output: basePromptOutput});
  source.stream();
};

export default generateAction;




/*
const basePromptPrefix = `Write a research paper titled "`; //Please make sure the research paper goes in-depth on the topic and shows that the writer did their research.
const basePromptSuffixLanguage = '". \n'; // todo: dropdown list zur sprachauswahl implementieren! in German
const basePromptSuffix = 'Research Paper:';


var source = new SSE(
    "https://api.openai.com/v1/models/text-davinci-003/completions",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      },
      method: "POST",
      payload: JSON.stringify({
        prompt: `${basePromptPrefix}${req.body.userInput}${basePromptSuffixLanguage}${basePromptSuffix}`,
        temperature: 0.96,
        max_tokens: 250,
        frequency_penalty: 0.5,
        presence_penalty: -0.5,
        stream: true,
        stop: ["\n\n"],
      }),
    }
  );

  source.addEventListener("message", function (e) {
    // Assuming we receive JSON-encoded data payloads:
    var payload = JSON.parse(e.data);
    console.log(payload);
  });*/