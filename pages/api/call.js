const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const generateAction = async () => {

const response = await openai.createImage({
  prompt: "A painting of a duck and a bear as friends. In the Style of a fairytale book.The painting should have smooth outlines. Give it a Disney like stlye.", //Give it a little Cartoon looking style.
  n: 2,
  size: "512x512",
});
debugger;
console.log(response);
};
generateAction();
