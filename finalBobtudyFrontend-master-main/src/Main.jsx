import './Main.css';

import Header from"./Header";

import locate from'./imgs/locate.png';
import throttle from 'lodash/throttle';

import axios from 'axios';
import React, { useState, useEffect,callback,useCallback,useRef } from 'react';
import Card from './Card';
function Main() {
    const [posts,setPosts]=useState([]);
 
 
    const getPosts=()=>{
      console.log("검색어:"+searchText);
      axios.get('/dining/all').then((res)=>{
        
       
        if(searchText==''&&regionset==''&&genderset=='혼성'){
        console.log('전체조회'+res.data);
        setPosts(res.data);}
        if(regionset==''&&genderset=='혼성'){
          setPosts(res.data.filter(function(e){
              return e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText);
          }))
        }
        if(genderset=='남성'){
          if(regionset==''){
            setPosts(res.data.filter(function(e){
          return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('남성');}))}
          if(regionset=='서울'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('남성')&&e.restaurant_location.includes('서울');
          }))}
          if(regionset=='경기'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('남성')&&e.restaurant_location.includes('경기');
          }))}
          if(regionset=='인천'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('남성')&&e.restaurant_location.includes('인천');
          }))}
          if(regionset=='강원'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('남성')&&e.restaurant_location.includes('강원');
          }))}
          if(regionset=='충청'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('남성')&&e.restaurant_location.includes('충청');
          }))}
          if(regionset=='전라'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('남성')&&e.restaurant_location.includes('전라');
          }))}
          if(regionset=='경상'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('남성')&&e.restaurant_location.includes('경상');
          }))}
          if(regionset=='대전'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('남성')&&e.restaurant_location.includes('대전');
          }))}
          if(regionset=='대구'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('남성')&&e.restaurant_location.includes('대구');
          }))}
          if(regionset=='울산'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('남성')&&e.restaurant_location.includes('울산');
          }))}
          if(regionset=='부산'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('남성')&&e.restaurant_location.includes('부산');
          }))}
          if(regionset=='광주'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('남성')&&e.restaurant_location.includes('광주');
          }))}
          if(regionset=='제주'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('남성')&&e.restaurant_location.includes('제주');
          }))}
        }
        else if(genderset=='여성'){
          if(regionset==''){
            setPosts(res.data.filter(function(e){
          return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('여성');}))}
          if(regionset=='서울'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('여성')&&e.restaurant_location.includes('서울');
          }))}
          if(regionset=='경기'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('여성')&&e.restaurant_location.includes('경기');
          }))}
          if(regionset=='인천'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('여성')&&e.restaurant_location.includes('인천');
          }))}
          if(regionset=='강원'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('여성')&&e.restaurant_location.includes('강원');
          }))}
          if(regionset=='충청'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('여성')&&e.restaurant_location.includes('충청');
          }))}
          if(regionset=='전라'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('여성')&&e.restaurant_location.includes('전라');
          }))}
          if(regionset=='경상'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('여성')&&e.restaurant_location.includes('경상');
          }))}
          if(regionset=='대전'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('여성')&&e.restaurant_location.includes('대전');
          }))}
          if(regionset=='대구'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('여성')&&e.restaurant_location.includes('대구');
          }))}
          if(regionset=='울산'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('여성')&&e.restaurant_location.includes('울산');
          }))}
          if(regionset=='부산'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('여성')&&e.restaurant_location.includes('부산');
          }))}
          if(regionset=='광주'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('여성')&&e.restaurant_location.includes('광주');
          }))}
          if(regionset=='제주'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('여성')&&e.restaurant_location.includes('제주');
          }))}
        }
        else if(genderset=='혼성'){
          if(regionset==''){
            setPosts(res.data.filter(function(e){
          return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('혼성');}))}
          if(regionset=='서울'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('혼성')&&e.restaurant_location.includes('서울');
          }))}
          if(regionset=='경기'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('혼성')&&e.restaurant_location.includes('경기');
          }))}
          if(regionset=='인천'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('혼성')&&e.restaurant_location.includes('인천');
          }))}
          if(regionset=='강원'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('혼성')&&e.restaurant_location.includes('강원');
          }))}
          if(regionset=='충청'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('혼성')&&e.restaurant_location.includes('충청');
          }))}
          if(regionset=='전라'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('혼성')&&e.restaurant_location.includes('전라');
          }))}
          if(regionset=='경상'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('혼성')&&e.restaurant_location.includes('경상');
          }))}
          if(regionset=='대전'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('혼성')&&e.restaurant_location.includes('대전');
          }))}
          if(regionset=='대구'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('혼성')&&e.restaurant_location.includes('대구');
          }))}
          if(regionset=='울산'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('혼성')&&e.restaurant_location.includes('울산');
          }))}
          if(regionset=='부산'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('혼성')&&e.restaurant_location.includes('부산');
          }))}
          if(regionset=='광주'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('혼성')&&e.restaurant_location.includes('광주');
          }))}
          if(regionset=='제주'){
            setPosts(res.data.filter(function(e){
            return (e.dining_title.includes(searchText)||e.restaurant_name.includes(searchText))&&e.gender_check.includes('혼성')&&e.restaurant_location.includes('제주');
          }))}
        }
      });
    }
  useEffect(()=>{
    
    getPosts();
  },[]);
  const[searchText,setSearchText]=useState('');
  const onSearch=()=>{
    getPosts();
  }
  const [genderset, setGender] = useState('혼성');
  const [regionset, setRegion] = useState('');
 
  const handleSelect = (e) => {
    setGender(e.target.value);
    
  };
  const handleSelect2 = (e) => {
    setRegion(e.target.value);
    
  };
  const [,updateState]=useState();
  const forceUpdate=useCallback(()=>updateState({}),[]);
    console.log(genderset);
    console.log(regionset);
   
   let countsetting=6;
   let postcounter=0;
   function reset(){
    
    setcounter(countsetting);
    console.log("카운터세팅값="+countsetting);
    forceUpdate();
   }
   const [count,setcounter]=useState(6);  //한번에 6게시글씩보기

   function loginmessage(){
    alert('로그인 후 진행해주세요!')
   }
  
  return (

    <div className="Main">

      <Header />
      <div className="Main2">

           <br></br><br></br><br></br>
           <input 
            onKeyDown={(e)=>setSearchText(e.target.value)}
            //onKeyUp={getPosts}
            className="search" type="text" placeholder="원하시는 키워드를 입력해보세요! (입력후 엔터를 누르고 적용)"/>
           <br></br><div className='comment'>원하시는 밥상이 없다면 직접 차려보세요! <button onClick={loginmessage} className="write">밥상차리러 가기</button></div> <br></br>
           <div className="gridtop">
           
           <select onChange={handleSelect} value={genderset} id="gender" className="inputgenderset">
                <option  value='혼성' >혼성</option>
                <option  value='남성' >남성</option>
                <option  value='여성'>여성</option>   
            </select>
             
            <select onChange={handleSelect2} value={regionset} id="region" className="inputgenderset">
                <option  value='' >전국</option>
                <option  value='서울' >서울</option>
                <option  value='경기'>경기</option>
                <option  value='인천'>인천</option>
                <option  value='강원'>강원</option>
                <option  value='대전' >대전</option>
                <option  value='대구' >대구</option>
                <option  value='울산' >울산</option>
                <option  value='부산' >부산</option>
                <option  value='광주' >광주</option>
                <option  value='충청'>충청</option>
                <option  value='전라'>전라</option>
                <option  value='경상'>경상</option>
                <option  value='제주'>제주</option>
            </select>
            <button className="submit" onClick={getPosts}>적용</button>
            </div>
           
           <br></br>
            <div className="grid">
             
              {posts.map(post=>{
                console.log(count);
                console.log(postcounter);
               
                if(postcounter==count){
                 return;
                }
                else{
                  countsetting++;
                }
                postcounter++;
                return (
                  
                  <Card onClick={loginmessage}
                  
                  //accessuserid={id}
                  id={post.diningId} 
                  title={post.dining_title} 
                  restaurantname={post.restaurant_name}
                  hour={post.hour}
                  minute={post.minute}
                  day={post.day}
                 
                  month={post.month}
                  writemonth={post.writemonth}
                  writeday={post.writeday}
                  endmonth={post.endmonth}
                  endday={post.endday}
                  attendcounter={post.people_count}
                  attender1={post.attender1}
                  attender2={post.attender2}
                  attender3={post.attender3}
                  region={post.restaurant_location}
                  thumbnail={post.dining_thumbnail}
                  userid={post.writer_id}
                  maxattender={post.maxattender}
                  introduction={post.introduction}
                  />
                  
                );
               
              })}
            </div>

              <button className="submit2" onClick={reset}>더보기</button>
           
       </div>   
      
    </div>
  );
}

export default Main;