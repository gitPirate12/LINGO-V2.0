import './translator.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Button, TextField, IconButton } from '@mui/material';
import { Translate, ContentCopy, Mic, Stop } from '@mui/icons-material';

function LanguageTranslator() {
  const [textToCopy, setTextToCopy] = useState('');
  const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });
  const [isTranslating, setIsTranslating] = useState(false);
  const [isCultured, setCultured] = useState(false);
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  
  const [fromContent, setFromContent] = useState('en-GB');
  const [toContent, setToContent] = useState('si-LK');
  const [translatedText, setTranslatedText] = useState('');
  const [inputText, setInputText] = useState('');

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const handleInputChange = (e) => setInputText(e.target.value);

  const handleTranslate = () => {
    const transLINK = `https://api.mymemory.translated.net/get?q=${inputText + transcript}&langpair=${fromContent}|${toContent}`;
    fetch(transLINK)
      .then(response => response.json())
      .then(data => setTranslatedText(data.responseData.translatedText))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) return;
    if (inputText !== '') setTextToCopy(inputText);
    if (transcript !== '') setTextToCopy(transcript);
  }, [inputText, transcript, browserSupportsSpeechRecognition]);

  return (
    <main className="translator-container">
      {/* Language Selector */}
      <section className="language-selector">
        <div className="language-options">
          <Button className="language-option active-language">English</Button>
          <Button className="language-option active-language">Sinhala</Button>
        </div>
      </section>

      {/* Input Text Area */}
      <section className="translation-area">
        <TextField
          className="text-field"
          placeholder="Type here in English..."
          multiline
          maxRows={4}
          variant="outlined"
          value={inputText + transcript}
          onChange={handleInputChange}
        />
      </section>

      {/* Translated Text Area */}
      <section className="translation-area">
        <TextField
          className="text-field"
          placeholder="Translated text in Sinhala"
          multiline
          maxRows={4}
          variant="outlined"
          value={translatedText}
          readOnly
        />
      </section>

      {/* Action Buttons */}
      <section className="action-buttons">
        <div className="button-container">
          <div className="button-group">
            <Button 
              className="action-button translate-button" 
              variant="contained" 
              startIcon={<Translate />} 
              onClick={handleTranslate}
            >
              Translate
            </Button>
            
            <Button 
              className="action-button secondary-button" 
              variant="contained" 
              onClick={setCopied} 
              startIcon={<ContentCopy />}
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
            
            <IconButton 
              className="action-button secondary-button" 
              onClick={startListening}
            >
              <Mic />
            </IconButton>
            
            <IconButton 
              className="action-button secondary-button" 
              onClick={SpeechRecognition.stopListening}
            >
              <Stop />
            </IconButton>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LanguageTranslator;
