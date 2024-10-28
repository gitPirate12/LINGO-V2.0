import './translator.css'
import SpeechRecognition,{ useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import {useEffect, useState} from 'react';
import axios from "axios";

function LanguageTranslator() {

  const [textToCopy,setTextToCopy] = useState();
  const [isCopied,setCopied] = useClipboard(textToCopy,{successDuration:1000});
  const [isTranslating, setIsTranslating] = useState(false);
  const [isCultured , setCultured] = useState(false);
  const newGalleText = '';
  const startListening = ()=> SpeechRecognition.startListening({continuous:true});//si-LK
  const {transcript,browserSupportsSpeechRecognition} = useSpeechRecognition();

    const [fromContent, setFromContent] = useState('en-GB');
    const [toContent, setToContent] = useState('si-LK');
    let [translatedText, setTranslatedText] = useState('');
    const [inputText, setInputText] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };
    const handleTranslate = () => {
              const transLINK = `https://api.mymemory.translated.net/get?q=${inputText+transcript}&langpair=${fromContent}|${toContent}`;
              fetch(transLINK)
              .then(response => {
                  console.log('Response status:', response.status); //display console output response 
                  return response.json();
              })
                  .then(data => setTranslatedText(data.responseData.translatedText))
                  .catch(error => console.error('Error:', error));
                  if(fromContent.data==null){
                    return 'empty text';
                  }
              };
              const setCultural = (event) => {

                function getWords(){
                  axios.get("http://localhost:3040/api/culture/").then((res)=>{
                      console.log(res);
                  }).catch((err)=>{
                      alert(err.message);
                  })
                      }
              getWords();
                const selectedValue = event.target.value;
                console.log('Selected value:', selectedValue);
                
                const word = translatedText.split(" ");
                let x =0;
                
                
                
                if(selectedValue == 1)
                  {
                    while (x < 10 && x < word.length) {
                      const newWord = word[x];
                      console.log("Word:", newWord); // Print the word
                  
                      // Check if the word's length is greater than or equal to 3
                      if (newWord.length <=4) {
                          const sliced = newWord.slice(-4);
                          console.log("My sliced:", sliced); // Print the last two letters of the word
                          if(sliced == 'තිද?'){
                            word[x] = newWord.slice(0,-4)+'තැයි?';
                            console.log("new",word[x]); 
                            const qw = word.join(" ");
                          setTranslatedText(qw);
                          }
                          else if(sliced == 'වද?'){
                            word[x] = newWord.slice(0,4)+'වැයි?';
                            console.log("new",word[x]); 
                            const qw = word.join(" ");
                          setTranslatedText(qw);
                          }
                      }
                      else if(newWord.length>=3){
                        const sliced = newWord.slice(-4);
                        console.log("My sliced:", sliced); // Print the last two letters of the word
                        if(sliced == 'තිද?'){
                          word[x] = newWord.slice(0,-2)+'තැයි?';
                          console.log("new",word[x]); 
                        }
                        else if(sliced == 'නවද?'){
                          word[x] = newWord.slice(0,4)+'වැයි?';
                          console.log("new",word[x]); 
                          const qw = word.join(" ");
                          setTranslatedText(qw);
                          
                        }
                        else if(sliced == 'වද?'){
                          word[x] = newWord.slice(0,-4)+'වැයි?';
                          console.log("new",word[x]); 
                          const qw = word.join(" ");
                        setTranslatedText(qw);
                        }
                        else if(sliced == 'න්නද'){
                          word[x] = newWord.slice(0,-4)+'න්නැයි?';
                          console.log("new",word[x]); 
                          const qw = word.join(" ");
                        setTranslatedText(qw)
                        }
                      }
                  
                      console.log("Length of newWord:", newWord.length); // Print the length of the word
                  
                      x++;
                  }
                  }
                  else{
                    setCultured(translatedText);
                    console.log('Galle',translatedText);

                  }
                
                // You can perform other actions here based on the selected value
              };
              useEffect(() => {
                if (!browserSupportsSpeechRecognition) {
                         return;
                      }
                  
                      if ( inputText!== '') {
                        setTextToCopy(inputText);
                      }
                      if ( transcript!== '') {
                        setTextToCopy(transcript);
                      }
                    }, [inputText,transcript, browserSupportsSpeechRecognition, isTranslating]);
                   
 return (
  <>
      {/* interface */}
       <div className='container'>
        <p className='head1'>Convert To :</p>
        <button className="translateBtn" onClick={setCultural} value={1} >Down South</button>
        <button className="translateBtn" onClick={setCultural} value={0}>Matale</button>
        <br></br>
        <div className='rec_item'>
          
              <div id='trans-select1' defaultValue='en-GB'value={fromContent} onChange={(e) => setFromContent(e.target.value)} >English</div>
              <div id='trans-select2' defaultValue='si-LK'value={fromContent} onChange={(e) => setFromContent(e.target.value)} >Sinhala</div>
          
        <br></br>
        <br></br>
        <textarea id='textInOut' onClick={()=>setTextToCopy(inputText)} maxLength="5000" className="fromText" placeholder="write down!" value={inputText+transcript} onChange={handleInputChange}>{transcript}</textarea>
        <textarea id='textInOut' className="toTranslate" placeholder="Translated Text" value={translatedText} readOnly></textarea>
        <br></br>
        
        <button className="translateBtn" onClick={handleTranslate}>Translate</button>
        
          <button className="translateBtn" onClick={setCopied} >
            
             {isCopied ? "Copied!" :"Copy to clipboard"}
           </button>
          
          <button className="translateBtn" onClick={startListening}>Start Listening</button>
          <button className="translateBtn" onClick={SpeechRecognition.stopListening}>Stop Listening</button>
          </div>
        </div> 
      
    </>
  );
 }

 export default LanguageTranslator;