import logo from './logo.svg';
import './App.css';
import {appendErrors, useForm} from 'react-hook-form';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import Main from './Main';
import { HashRouter,BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import React from 'react';
import Auth from "./Auth";
import Main_islogin from './Main_islogin';
import Writepost from './Writepost';
import Viewpost from './Viewpost';
import MyPage from './MyPage';
import Profile from './Profile';
import DiningList from './DiningList';
import KakaoCallback from './KakaoCallback';
import SelectSpoon from './SelectSpoon';
// 여기서부터 추가
import RatingPopup from './RatingPopup';
import StarRating from './StarRating';
import MyScore from './MyScore';
import Message from './Message';

 function App() {
  const REST_API_KEY="[RESTAPIKEYVALUE]";
  const REDIRECT_URI="http://localhost:3000/oauth/kakao/callback";
  
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div className="App">
      
          <Routes>
              <Route path="/*" element={<Main />}></Route> 
              <Route path="/oauth/kakao/callback" element={<KakaoCallback/>}></Route>
              <Route path="/LoginPage" element={<LoginPage />}></Route>
              <Route path="/RegisterPage" element={<RegisterPage />}></Route>
              <Route path="/Main/*" element={<Main />}></Route>
              <Route path="/Main_islogin" element={<Main_islogin />}></Route>
              <Route path="/Writepost" element={<Writepost />}></Route>
             
              <Route path="/Viewpost" element={<Viewpost />}></Route>
              <Route path="/MyPage" element={<MyPage />}></Route>
              <Route path="/Profile" element={<Profile />}></Route>
              <Route path="/DiningList" element={<DiningList />}></Route>
              <Route path="/MyScore" element={<MyScore/>}></Route>
              <Route path="/Message" element={<Message/>}></Route>
              
              <Route path="/SelectSpoon" element={<SelectSpoon />}></Route>
              <Route path="/RatingPopup" element={<RatingPopup />}></Route>
              <Route path="/StarRating" element={<StarRating />}></Route>
              
         </Routes>
          
        
        
    </div>
    </BrowserRouter>
  );
}

export default App;
