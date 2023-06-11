import './Header.css';
import { BrowserRouter, Routes, Route,Link} from 'react-router-dom';
import React from 'react';
export const Header =()=>{
    return(
        <header className="header">
            <div className='headergrid'>
                <div className='div1'>
                
                </div>
                <div className='div2'>
                밥터디
                </div>
                <div className='div3'>

                </div>
                <div className='div4'>
                <Link to="/LoginPage">
                 <button className="headerButton">로그인 또는 회원가입</button>
                </Link>
                </div>

            </div>
        </header>
    )
}
export default Header;