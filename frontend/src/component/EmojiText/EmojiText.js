import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Card, CardContent, TextField, Button } from '@mui/material';

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
    <div className="relative flex min-h-screen flex-col bg-[#FFFFFF] overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col max-w-[960px] flex-1">
          <Card elevation={0} className="rounded-xl bg-[#F4EFE6]">
            <CardContent>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <TextField
                  placeholder="Enter emoji here"
                  className="flex w-full min-w-0 flex-1 rounded-xl text-[#1C160C] h-14 placeholder:text-[#A18249] p-[15px] text-base font-normal leading-normal border border-[#E9DFCE] bg-[#FFFFFF] focus:outline-none focus:ring-0"
                  value={emoji}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    className: 'resize-none overflow-hidden',
                  }}
                />
              </div>
              <div className="flex px-4 py-3 justify-center">
                <Button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-full h-12 px-5 flex-1 bg-[#019863] text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em]"
                  onClick={handleSearch}
                >
                  TRANSLATE
                </Button>
              </div>
              <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
                <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#E9DFCE] py-5">
                  <p className="text-[#A18249] text-sm font-normal leading-normal">English</p>
                  <p className="text-[#1C160C] text-sm font-normal leading-normal">{meaningEng}</p>
                </div>
                <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#E9DFCE] py-5">
                  <p className="text-[#A18249] text-sm font-normal leading-normal">Sinhala</p>
                  <p className="text-[#1C160C] text-sm font-normal leading-normal">{meaningSin}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EmojiText;
