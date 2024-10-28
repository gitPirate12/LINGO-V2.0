import React,{useState} from "react";
import axios from "axios";

export default function Addemoji(){

const[emoji,setEmoji] = useState("");
const[meaningEng,setMeaningEng] = useState("");
const[meaningSin,setMeaningSin] = useState("");


function sendData(e){
  e.preventDefault();

  const newEmoji = {
    emoji,
    meaningEng,
    meaningSin
  }

axios.post("http://localhost:3040/emoji/add",newEmoji)
.then(()=>{
  alert("Data Added");
  window.location.href = `/add`;

}).catch((err)=>{
  alert(err)

})
}


    return(
        <div className="container">
<form onSubmit={sendData}>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Enter emoji</label>
    <input type="text" class="form-control" id="emoji" placeholder="Enter Emoji"
    onChange={(e)=>{

      setEmoji(e.target.value);




    }}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" className="form-label">English</label>
    <input type="text" className="form-control" id="meaningEng" placeholder="Enter English Meaning"
    
    onChange={(e)=>{

      setMeaningEng(e.target.value);




    }}

    />
  </div>

  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Sinhala</label>
    <input type="text" className="form-control" id="meaningSin" placeholder="Enter Sinhala Meaning"
    
      
    onChange={(e)=>{

      setMeaningSin(e.target.value);




    }}
    />
  </div>

 
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

        </div>
    )

}