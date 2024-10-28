import React, { useState } from 'react';
import axios from 'axios';
import './EmojiText.css';
import Swal from 'sweetalert2';

function EmojiText() {
  const [emoji, setEmojiInput] = useState('');
  const [meaningEng, setEmojiMeaningEng] = useState('');
  const [meaningSin, setEmojiMeaningSin] = useState('');

  const handleInputChange = (e) => {
    const emojiValidate = /^[\u{1F000}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2000}-\u{206F}\u{2070}-\u{209F}\u{20A0}-\u{20CF}\u{20D0}-\u{20FF}\u{2100}-\u{214F}\u{2150}-\u{218F}\u{2190}-\u{21FF}\u{2200}-\u{22FF}\u{2300}-\u{23FF}\u{2400}-\u{243F}\u{2440}-\u{245F}\u{2460}-\u{24FF}\u{2500}-\u{257F}\u{2580}-\u{259F}\u{25A0}-\u{25FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]$/u;
    const input = e.target.value;
  
    if (input === '' || emojiValidate.test(input)) {
      setEmojiInput(input);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter only one emoji as input.',
      });
    }
  };
  

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3040/emoji/search/${encodeURIComponent(emoji)}`);
      setEmojiMeaningEng(response.data.meaningEng);
      setEmojiMeaningSin(response.data.meaningSin);
    } catch (error) {
      console.error('Error searching emoji:', error.message);
      setEmojiMeaningEng('Error searching emoji');
      setEmojiMeaningSin('Error searching emoji');
    }
  };

  return (
    <div className="emoji-card" style={{ marginBottom: '300px' }}>
      <div className="emoji-header">
        Emoji to Text Translator
      </div>
      <div className="emoji-body">
        <textarea
          id="emoji"
          value={emoji}
          onChange={handleInputChange}
          placeholder="Enter emoji here..."
          className="emoji-input"
        />
        <button onClick={handleSearch} className="search-button">Translate</button>
        <div className="meanings-container">
          <div className="meaning-box">
            <div className="meaning-heading">English</div>
            <div className="meaning-content">{meaningEng}</div>
          </div>
          <div className="meaning-box">
            <div className="meaning-heading">Sinhala</div>
            <div className="meaning-content">{meaningSin}</div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default EmojiText;