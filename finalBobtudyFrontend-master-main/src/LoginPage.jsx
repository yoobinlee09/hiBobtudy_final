import './LoginPage.css';
import React, { useState,useEffect,useCallback } from 'react'

import axios from 'axios';
import {appendErrors, useForm,Link} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Auth from './Auth';

import Header from"./Header";
import './Main_islogin';
export default function LoginPage() {
    let realId="";
    let realPw ="";
    const [pwValid,setPwValid]=useState(false);
    const [idValid,setIdValid]=useState(false);
    const [notAllow,setNotAllow]=useState(true);
    const { naver } = window;
    const[pw,setPw]=useState('');
    const[id,setId]=useState('');
    
    const navigate = useNavigate();
    function handleCallbackResponse(response){
      console.log("Encoded JWT ID token: "+response.credential);
    }
   


    const navigateToRegister = () => {
     navigate("/RegisterPage");
     };
    useEffect(()=>{
        var regex =/^[a-z0-9]{6,20}$/;
        if(regex.test(id)){
          setIdValid(true);
    
        } else{
          setIdValid(false);
        }
      },[id])
      const handleId=(e)=>{
        setId(e.target.value);
        const regex= /^[a-z0-9]{6,20}$/;
        if(regex.test(id)){
          setIdValid(true);
    
        } else{
          setIdValid(false);
        }
      }
      useEffect(()=>{
        var regex =/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if(regex.test(pw)){
          setPwValid(true);
        }else{
          setPwValid(false);
        }
      },[pw])
      const handlePassword=(e)=>{
        setPw(e.target.value);
        const regex= /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if(regex.test(pw)){
          setPwValid(true);
        }else{
          setPwValid(false);
        }
      }
      useEffect(() => {
        if(pwValid&&idValid){
          setNotAllow(false);
          return;
        }
        setNotAllow(true);
    
      },[pwValid,idValid]);
    
      
      const Login = () => {
        const REST_API_KEY = '9ee85c26ac5bcf30210926a27263816e';
        const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
        const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
      
        const loginHandler = () => {
          window.location.href = link;
        };
      
        return (
          loginHandler()
        );
      };
      const REACT_APP_NAVER_CLIENT_ID="hyMudWQ9m9AWIaDogHlm"
      const REACT_APP_NAVER_CALLBACK_URI="http://localhost:3000/oauth/naver/callback"
      const Login_naver = () => {

        let naver_api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' +REACT_APP_NAVER_CLIENT_ID+ '&redirect_uri='+encodeURI(REACT_APP_NAVER_CALLBACK_URI)+'&state=' + Math.random().toString(36).substr(3, 14);
        return (
          window.location.href=naver_api_url
        );
      };



    const clientId='578266457967-4ftt4n15ngu7l5i785maugqmm1ljprs3.apps.googleusercontent.com';
    // eslint-disable-next-line no-restricted-globals
    const goToMain = () => {
      navigate('/Main_islogin',{state : {userid:id}});
    };
    const navigateToGoogleSignin = () => {
      navigate("/GoogleButton");
      };

      const onClickLogin = () => {
        let memberCount;
        let i=0;
        console.log('click login')
        console.log('ID : ', id)
        console.log('PW : ', pw)
       /* fetch("http://localhost:3001/users/"+id).then((res)=>{
          return res.json();
        }).then((resp)=>{
          console.log(resp)
          if(Object.keys(resp).length==0){
            alert('유효한 아이디를 입력하세요.');
          }else{
            if(resp.password==pw){
              goToMain(id);
            }else{
              alert('로그인 실패');
            }
          }
        }).catch((err)=>{
          alert('로그인 실패');
        })*/
        axios.post(`/login`,{
          username:id,
          password:pw,
         
        })
      .then((response) => {
        console.log(response.data);
        if(response.data=="success"){
          goToMain(id);
          
        }else{
          alert('비밀번호가 일치하지 않습니다.');
          
        }
      })
      .catch((error) => {
        console.log("안됨");
      });
       {/*} fetch("/login").then((res)=>{
          return res.json();
        }).then((res)=>{
          console.log(res);
          {/*
          console.log(res);
          memberCount=res.length;
          console.log(memberCount);
          while(i<memberCount){
            console.log('i:'+i+"memberCount"+memberCount);
            if(res===res[i].useri){
              if(pw===res[i].password){
                goToMain(id);
                break;
              }else{
                alert('비밀번호가 일치하지 않습니다.');
                break;
              }
              
              
            }else{
              i++;
            }
            if(i===memberCount){
              alert('존재하지 않는 아이디입니다.')
            }}
          
        }
      )*/}
      }

    return (

        <div className="LoginPage">
          <Header/>
          <div className="why">
            <div className="none">
            </div>
            <div className="Logintitle">
                <h1>밥터디 로그인</h1>
            </div>
            <p className='space_LoginPage'></p>
            <div className="contentWrap_LoginPage">
            <fideldset>
           
            
            <div className="inputWrap">
            <input type="text" name="id" placeholder="아이디:" className="inputbox_LoginPage" value={id}
            onChange={handleId}></input>

            <br></br><br></br>

            <div className="inputWrap">
            <input type='password' name="pw" placeholder="비밀번호:" className="inputbox_LoginPage" value={pw}
            onChange={handlePassword}></input>
            </div>
            
          

            </div>
            </fideldset>
            <div className="none2">
            </div>
            <div>
              <button disabled={notAllow} type="submit" className="bottomButton_LoginPage"
             
              onClick={e => {
               
                e.stopPropagation();
                onClickLogin();
                /*
                          while(i<memberCount){
                            if(id==data.users[i].userid){
                              realId=id;
                              realPw=data.users[i].pw;
                              console.log("membercount: "+i);
                              break;
                            }else{
                            i++;
                            console.log(i);}
                            if(i===memberCount){
                              
                                alert('존재하지 않는 아이디 입니다.');
                            }
                          }
                          
      
              
                
                
                          if (realId == id) {
                            if (realPw == pw) {
                              e.stopPropagation();
                              onClickLogin(); //콘솔로그,axios.post
                              
                              
                              goToMain(id);
                               
                            }
                            else{
                              alert('비밀번호가 일치하지 않습니다.');
                            }
                          }*/
                        }}>로그인</button>
              <button  className="bottomButton_LoginPage"onClick={navigateToRegister}>회원가입</button>
              <p className='underbar'></p>
            </div>
            <br></br><br></br>
            </div>
            <div className="snsLogin">
            <p>sns로 간편하게 로그인하세요.</p>
            {/*<div>
            <button type="button" className="naverbutton"></button></div>*/}
            <div className='grid_login'>
              <div>
            <button className='snsLogin_Button_Naver' onClick={Login_naver}></button>
              </div>
              <div>
            <button className='snsLogin_Button_Kakao' onClick={Login}></button>
              </div>
              <div /*id="signInDiv"*/>
             
             
              <button className='snsLogin_Button_Google' /*onClick={navigateToGoogleSignin}*/></button>
              </div>
             </div>
            </div>
         </div>
      </div>
      );
  }