

import './Main.css';
import {appendErrors, useForm} from 'react-hook-form';

import Header_islogin from"./Header_islogin";
import { BrowserRouter, Routes, Route,Link} from 'react-router-dom';

import React, { useState, useEffect,callback,useCallback,useRef } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import { KAKAO_AUTH_URL } from "./Auth.jsx";
import LoginPage from './LoginPage';




import axios from 'axios';

import Card from './Card';

 // RatingPopup추가부분
 import RatingPopup from './RatingPopup';


export default function Main_islogin() {
  const location = useLocation();
  // eslint-disable-next-line no-restricted-globals
  const id = location.state.userid;
  const navigate = useNavigate();
  const gotoWritepost = () => {
        navigate('/Writepost',{state : {userid:id}});
      };
  const [posts,setPosts]=useState([]);
  //axios.get('/dining/all').then((res)=>{console.log(res);})
  
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

   // RatingPOpup 추가
    // RatingPopup추가부분
  const [showPopupPosts, setShowPopupPosts] = useState(true); // filteredPosts의 handleRatingClose
  const [showPopupPosts2, setShowPopupPosts2] = useState(true); // filteredPosts2의 handleRatingClose
  const [diningSpoonData, setDiningSpoonData] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); // 초기값을 빈 배열로 설정
  const [filteredPosts2, setFilteredPosts2] = useState([]); // 초기값을 빈 배열로 설정

  useEffect(() => {
    const now = new Date();
    const threshold = 2 * 60 * 60 * 1000;
  
    const ListFilterPosts = async () => {
      try {
        // 겸상신청 db 조회 아마 /applications?
        const response = await axios.get('/dining/all');
        //  axios.get('/dining/all').then((res)=>{console.log(res.data);})
        const allposts = response.data;
        // setDiningSpoonData(allposts);
        console.log('allposts',allposts)
  
        // 게시글의 밥장인 경우
        const filteredPosts = allposts.filter((post) => {
          const { hour, minute, day, month } = post;
          const postTime = new Date(now.getFullYear(), month - 1, day, hour, minute);
          const elapsedTime = now - postTime;
          const isOwner = post.writer_id === id;
          return (isOwner) && (elapsedTime >= threshold);
        });
  
        setFilteredPosts(filteredPosts); // 빈 배열이 아닌 게시물을 설정하도록 변경
  
        // 참여자 attender인 경우
        const filteredPosts2 = allposts.filter((post) => {
          const { hour, minute, day, month } = post;
          const postTime = new Date(now.getFullYear(), month - 1, day, hour, minute);
          const elapsedTime = now - postTime;
          const isAttender = diningSpoonData.some((spoon) => spoon.username === id && spoon.selectionStatus === 1);
          console.log(isAttender+id,'isAttender')
        
          //  isAttender가 true일 경우, diningSpoonData 배열에서 spoon_id가 id와 일치하고 attending이 true인 경우를 찾음
          if (isAttender) {
            const matchingSpoon = diningSpoonData.find((spoon) => spoon.username === id && spoon.selectionStatus ===1);
            const matchingPostNumber = matchingSpoon.diningId;
            console.log('matchingSpoon',matchingPostNumber)
            console.log('elapsedTime',elapsedTime)
            return post.diningId === matchingPostNumber;
            //  return post.id === matchingPostNumber && elapsedTime >= threshold;
          }
          // 해당 spoon의 postnumber를 가져와서 posts 배열에서 id와 비교하여 일치하는 게시물을 필터링
          return false;
        });
  
        setFilteredPosts2(filteredPosts2); // 빈 배열이 아닌 게시물을 설정하도록 변경
      } catch (error) {
        console.error('Error fetching dining_spoon data:', error);
      }
    };
  
    ListFilterPosts();
  }, [posts, id]);
  
  console.log('Filtered Posts111111f:', filteredPosts);
  console.log('Filtered Posts22222f:', filteredPosts2);
  
// filteredPosts의 handleRatingClose
const handleRatingClosePosts = () => {
  setShowPopupPosts(false);
};

// filteredPosts2의 handleRatingClose
const handleRatingClosePosts2 = () => {
  setShowPopupPosts2(false);
};

useEffect(()=>{
  axios
.get("/applications/dining_spoon")
.then((response) => {
  setDiningSpoonData(response.data.data);
  console.log('dingS',response.data.data)
})
.catch((error) => {
  console.log('/applications/dining_spoon',error);
});

},[])
console.log('diningSpoonData',diningSpoonData);


  return (

    <div className="Main_islogin">

        <Header_islogin userid={id}/>
        {/* RatingPopup 추가부분 팝업 컴포넌트 표시 */}
{showPopupPosts && filteredPosts.map((post) => (
      <RatingPopup
        key={post.id}
        post={post}
        yourUserId={id}
        onClosePosts={handleRatingClosePosts}
        diningSpoonData={diningSpoonData}
        filteredPosts={filteredPosts}
        filteredPosts2={filteredPosts2}
        type="posts"
      />
    ))}
    {showPopupPosts2 && filteredPosts2.map((post) => (
      <RatingPopup
        key={post.id}
        post={post}
        yourUserId={id}
        onClosePosts2={handleRatingClosePosts2}
        diningSpoonData={diningSpoonData}
        filteredPosts={filteredPosts}
        filteredPosts2={filteredPosts2}
        type="posts2"
      />
    ))}
      <div className="Main2">

           <br></br><br></br><br></br>
           <input 
            onKeyDown={(e)=>setSearchText(e.target.value)}
            //onKeyUp={getPosts}
            className="search" type="text" placeholder="원하시는 키워드를 입력해보세요! (입력후 엔터를 누르고 적용)"/>
           <br></br><div className='comment'>원하시는 밥상이 없다면 직접 차려보세요! <button className="write" onClick={gotoWritepost}>밥상차리러 가기</button></div> <br></br>
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
                  
                  <Card
                  accessuserid={id}
                  id={post.diningId} 
                  title={post.dining_title} 
                  restaurantname={post.restaurant_name}
                  hour={post.hour}
                  minute={post.minute}
                  day={post.day}
                  postnnumber={post.diningId}
                 
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
                  
                 /* <div class="card" key={post.id}>
                  <div class="card-body">
                    {post.dining_title}
                  </div>
                </div>*/
                  
                );
               
              })}
            </div>

              <button className="submit2" onClick={reset}>더보기</button>
           
       </div>   
      
    </div>
  );
}
