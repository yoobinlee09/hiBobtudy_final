
import './Header_islogin.css';
import { BrowserRouter, Routes, Route,Link,useNavigate} from 'react-router-dom';

import React from 'react';
import LoginPage from './LoginPage';
// eslint-disable-next-line no-restricted-globals
export const Header_islogin =(props)=>{
    const id2=props.userid;
    const navigate = useNavigate();
    const gotoWritepost = () => {
        navigate('/Writepost',{state : {userid:id2}});
      };
      const gomypage = () => {        
        navigate('/MyPage',{state : {userid:id2}});
      };
    return(
        

        <header className="header">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <div className='headergrid'>
                <div className='div1'>
                
                </div>
                <div className='div2'>
                밥터디
                </div>
                <div className='div3'>
                    
                    <button onClick={gotoWritepost} className="writepostbutton">밥상 차리기</button>
                 
                </div>
                <div className='div4'>
                
                <div class="menu">
               <label for="expand-menu"><div>{props.userid}님 안녕하세요.</div></label>
               <input type="checkbox" id="expand-menu" name="expand-menu"/>
               <ul>
               <li><a href="/MyPage" className="item" onClick={gomypage}><div>마이페이지</div></a></li>
                
                 <li><a href="/" className="item"><div>로그아웃</div></a></li>
                 
                </ul>
    
                </div>
                
                </div>


            </div>
           
    
        </header>
    )
}
export default Header_islogin;