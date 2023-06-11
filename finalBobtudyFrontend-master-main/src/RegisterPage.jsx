import './RegisterPage.css';
import React, { useState,useEffect } from 'react'
import {appendErrors, useForm,Link} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Header from"./Header";
import axios from 'axios';
import * as fs from 'fs';

/*import {writeJsonFile} from 'write-json-file';*/

export default function RegisterPage() {
  const movePage=useNavigate();
  const [gender, setGender] = useState("");
  const [age,setAge]=useState(0);
  const handleSelect = (e) => {
    setGender(e.target.value);
    console.log(gender);
  };
  
  const [emailValid,setEmailValid]=useState(false);
  const [pwValid,setPwValid]=useState(false);
  const [idValid,setIdValid]=useState(false);
  const [pwRepeatValid,setPwRepeatValid]=useState(false);
  const [notAllow,setNotAllow]=useState(true);
  const [notAllow2,setNotAllow2]=useState(true);
  
  const[email,setEmail]=useState('');
  const[pw,setPw]=useState('');
  const[id,setId]=useState('');
  const[pwrepeat,setPwRepeat]=useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    var regex =/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if(regex.test(email)){
      setEmailValid(true);

    } else{
      setEmailValid(false);
    }
  },[email])
  const handleEmail=(e)=>{
    setEmail(e.target.value);
    const regex= /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if(regex.test(email)){
      setEmailValid(true);

    } else{
      setEmailValid(false);
    }
    
  }
  
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
  useEffect(()=>{
    if(pw===pwrepeat){
      setPwRepeatValid(true);
    }else{
      setPwRepeatValid(false);
    }
  },[pwrepeat])
  
  const handlePasswordRepeat=(e)=>{
    setPwRepeat(e.target.value);
    if(pw===pwrepeat){
      setPwRepeatValid(true);
    }else{
      setPwRepeatValid(false);
    }
  }
  const onClickIdConfirmButton=()=>{
    let memberCount;
    let i=0;
    fetch("/users").then((res)=>{
          return res.json();
        }).then((res)=>{
          console.log(res);
          memberCount=res.length;
          console.log(memberCount);
          while(i<memberCount){
            console.log('i:'+i+"memberCount"+memberCount);
            if(id===res[i].userid){
              alert('중복된 아이디 입니다. 다시 입력해주세요.')
              setIdValid(false);
              break;
            }else{
              i++;
            }
            if(i===memberCount){
              alert('사용할 수 있는 아이디입니다.')
            }}
          
        })/*.catch((err)=>{
          alert(' 실패');
        })*/
       
   

    
  }
  useEffect(() => {
    if(emailValid&&pwValid&&pwRepeatValid&&idValid){
      setNotAllow(false);
      return;
    }
    setNotAllow(true);

  },[emailValid,pwValid,pwRepeatValid,idValid]);

  useEffect(() => {
    if(idValid){
      setNotAllow2(false);
      return;
    }
    setNotAllow2(true);

  },[idValid]);
  const handleAge = (e) => {
    setAge(e.target.value);
    console.log('나이'+age);
  };
  //서버연결코드추가20230331
 const register=(id,pw,email)=>{
  //브라우저는 로컬파일을 수정삭제할수없어서 가입시 data.json에 쓰기불가
   /*axios.post('./db/data.json',{
    userid: id,
    pw: pw,
    email: email,
    gender:'male'
  })
  .then((res) => {
    console.log(res);
})*/}
  const onSubmit=()=>{
    axios.post('/signUp',{
      username:id,
      password:pw,
      email:email,
      gender:gender,
      age:age
    })
    alert("밥터디 회원이 되신 것을 환영합니다.");
    
  }
  const goToMain = () => {
    navigate('/');
  };

  return (

   <div className="RegisterPage">
    
      <Header/>
      <div className="Register2">
            <div className="none">
            </div>
        <div className="signuptitle">
           <h1>밥터디 회원가입</h1>
         <div className="signupcoment">
           <p>회원이 되어 다양한 혜택을 경험해 보세요!</p>
          </div>
                            <div className="space"></div>
      <div className="contentWrap">
        <form method="post" action="/process/adduser">
          <fideldset>
           
            <div className="signupcoment2">아이디</div>
            <div className="inputWrap">
            <input type="text" name="id" placeholder="아이디 입력(6~20자)" className="inputbox" value={id}
            onChange={handleId}></input>
            </div>

            <div className="errorMessage">{
              !idValid&&id.length>0&&(              
                <div> 올바른 아이디를 입력해주세요. 6~20자</div>)
              }
            </div>
            {/*<button disabled={notAllow2} type="button" onClick={onClickIdConfirmButton} className="checkButton">중복확인</button>*/}
            <br></br><br></br>
           
            <div className="signupcoment2">비밀번호</div>
            <div className="inputWrap">
            <input type='password' name="pw" placeholder="비밀번호 입력(문자,숫자,특수문자 포함 8~20자)" className="inputbox" value={pw}
            onChange={handlePassword}></input>
            </div>
            <div className="errorMessage">{!pwValid&&pw.length>0&&(<div>올바른 비밀번호를 입력해주세요. 문자,숫자,특수문자 포함 8~20자</div>)}</div>
            <br></br><br></br>
            
            <div className="signupcoment2">비밀번호 확인</div>
            <div className="inputWrap">
            <input type='password' placeholder="비밀번호 재입력" className="inputbox" value={pwrepeat}
            onChange={handlePasswordRepeat}></input></div>
            
            <div className="errorMessage">{!pwRepeatValid&&pwrepeat.length>0&&(<div>비밀번호가 일치하지 않습니다.</div>)}</div>
            <br></br><br></br>
            
            <legend className="signupcoment2">이메일 주소</legend>
            <div className="inputWrap">
            <input type="email" name="email" placeholder="이메일 주소를 입력하세요." className="inputbox"value={email} 
            onChange={handleEmail}></input>
           </div>
               <div className="errorMessage">{
              !emailValid&&email.length>0&&(              
                <div> 올바른 이메일을 입력해주세요.</div>)
              }</div>
              <br></br><br></br>
            <legend className="signupcoment2">성별</legend>
            <div >
            
            <select onChange={handleSelect} value={gender} id="gender" className="inputgender">
                <option selected >성별을 선택하세요.</option>
                <option  value='male' >남성</option>
                <option  value='female'>여성</option>   
            </select>

            
            </div>
            <br></br><br></br>
            <legend className="signupcoment2">나이</legend>
            <div className="inputWrap">
            <input type="number" name="age" placeholder="나이를 입력하세요." className="inputbox"value={age} 
            onChange={handleAge}></input>
           </div>
          </fideldset>
        </form>
        <div className="none"></div>
        <div> 
          <button disabled={notAllow} onClick={()=>{
          register(id,pw,email);
          console.log(id);
          console.log(pw);
          console.log(email);
          console.log(gender);
          onSubmit();
          
          goToMain();
          }} type="submit" className="bottomButton">가입하기</button>
        </div>
       </div>

        </div>
      </div>
    
  </div>
  );
}