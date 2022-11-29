import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
const [isGenerating, setIsGenerating] = useState(false);

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)


  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
const callGenerateToCEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate-ToC', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)


  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
const callGenerateChainEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate-chained', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)


  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
const callTranslateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling GoogleAPI...")
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ apiOutput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("Google replied...", output)


  setApiOutput(`${output}`);
  setIsGenerating(false);
}

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>PaperNinja | Unleash The Academic Warrior Within</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>PaperNinja</h1>
          </div>
          <div className="header-subtitle">
            <h2>The Writing Tool that Eliminates the Stress of Academic Writing</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
          placeholder="Type your topic here" 
          className="prompt-box" 
          value={userInput}
          onChange={onUserChangedText}
          />;
          <div className="prompt-buttons">
            <a className="generate-button" onClick={callGenerateEndpoint}>
              <div className="generate">
              {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
              </div>
            </a>
            <a className="generate-ToC-button" onClick={callGenerateToCEndpoint}>
              <div className="generate">
              {isGenerating ? <span class="loader"></span> : <p>Glossar</p>}
              </div>
            </a>
            <a className="generate-chained-button" onClick={callGenerateChainEndpoint}>
              <div className="generate">
              {isGenerating ? <span class="loader"></span> : <p>Chained</p>}
              </div>
            </a>
            <a className="translate-button" onClick={callTranslateEndpoint}>
              <div className="generate">
              {isGenerating ? <span class="loader"></span> : <p>Translate</p>}
              </div>
            </a>
          </div>
          <div className="prompt-buttons">
            
          </div>
          <div className="prompt-buttons">
            
          </div>
          <div className="prompt-buttons">
            
          </div>
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
        </div>
        )}
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
    </div>
  );
};

export default Home;
