
const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();

const CREDENTIALS = require('../../token.json');
const target = 'de';

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.projectId
});

/*const generateAction = async (req, res) => {
    console.log(req.body.apiOutput.text)
  // Run first prompt

    const text = 'Hello World!';

    async function translateText() {
        let [translations] = await translate.translate(text, target);
        translations = Array.isArray(translations) ? translations : [translations];
        console.log("Translations:");
        translations.forEach((translation, i) => {
            console.log(`${text[i]} => (${target}) ${translation}`);
        });
    translateText();
    }
    
    translateText();*/
const translateText = async (req, res) => {
    //const target = 'de';
    console.log(`input to translate: ${req.body.apiOutput}`);
    try {
        let [response] = await translate.translate(req.body.apiOutput, target);
        console.log("connection succesfull");
        console.log(`${response}`);
        const translateOutput = response;
        res.status(200).json({ output: translateOutput});
    }
    catch (error) {
        console.log(`Error --> ${error}`);
        return 0;
    }
    /*let[translations] = await translate.translate(text,target);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log('Translations:');
    translations.forEach((translation, i) => {
        console.log(`${text[i]} => (${target}) ${translation}`);
    });
    translateText();*/
/*const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}${basePromptSuffixLanguage}${basePromptSuffix}`,
    temperature: 0.96,
    max_tokens: 250,
    frequency_penalty: 0.5,
    presence_penalty: -0.5, //noch versuchen für abwechslung und neue ideen
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();
  res.status(200).json({ output: basePromptOutput});*/
};

export default translateText;


