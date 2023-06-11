import React from 'react';
import "./App.css";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const CLIENT_ID = "9ee85c26ac5bcf30210926a27263816e";
const REDIRECT_URI =  "http://localhost:3000/oauth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const Login = () => {
    const REST_API_KEY = '9ee85c26ac5bcf30210926a27263816e';
    const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
    const loginHandler = () => {
      window.location.href = link;
    };
  
    return (
      <button type='button' onClick={loginHandler}>
        로그인 하기
      </button>
    );
  };
const Auth = () => {
    const code = new URL(window.location.href).searchParams.get("code");
    return (
        <div>
            { code }
        </div>
    );
};
export default Auth;