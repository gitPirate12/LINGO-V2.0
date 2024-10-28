import React,{useState, useEffect} from "react";
import axois from "axios";
import EmojiPicker from 'emoji-picker-react';

export function AllEmojiText(){

    const [emojis,setEmojis] = useState([]);

    useEffect(() => {
        function getStudent(){
            axois.get("http://localhost:3040/emoji/").then((res)=>{
                console.log(res);
            }).catch((err)=>{
                alert(err.message);
            })
                }
        getStudent();

    },[])

    return(
        <div className="container">
            <h1>Hi...</h1>
            {/*
            <EmojiPicker />
    */}

        </div>
    )
}