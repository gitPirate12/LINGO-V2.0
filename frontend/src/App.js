//Navigation bar
import Navbar from './component/Navbar/Navbar';
//Footer
import Footer from './component/Footer/Footer';
import './component/Footer/FooterApp.css';


// emoji to text translater
import Addemoji from './component/EmojiText/Addemoji';
// import { AllEmojiText } from './component/EmojiText/AllEmojiText';
import EmojiText from './component/EmojiText/EmojiText';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from './component/Auth/Login';
import Signup from './component/Auth/Signup';
import ViewPosts from './component/DiscussionForum/ViewPosts';
import AddPost from './component/DiscussionForum/AddPost';
import EditPost from './component/DiscussionForum/EditPost';
import AddReply from './component/DiscussionForum/AddReply';
import EditReply from './component/DiscussionForum/EditReply';
import './App.css';
import Transltor from './component/translator/translator'
import ViewProfile from './component/Auth/ViewProfile';
import EditProfile from './component/Auth/EditProfile';


function App() {
  return (
    <Router>
      <div className='App'>
        { <Navbar /> }
        <Routes>
          {/* {emoji to text translater} */}
          {/* Commenting out the route for AllEmojiText */}
          {/* <Route path='/' element={<AllEmojiText />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/add' element={<Addemoji />} />
          <Route path='emojiText' element={<EmojiText />} />
          <Route path='/viewposts' element={<ViewPosts />} />
          <Route path='/addpost' element={<AddPost />} />
          <Route path='/editpost/:postId' element={<EditPost />} />
          <Route path='/addreply/:postId' element={<AddReply />} />
          <Route path='/editreply/:replyId' element={<EditReply />} />
          <Route path='/' element={<Transltor />} />
         <Route path='/viewprofile' element={<ViewProfile />} />
          <Route path='/editprofile' element={<EditProfile />} />
          
         
        </Routes>
        <Footer/>
      </div>
      

    </Router>
  );
}

export default App;
