import './DiningList.css';
import React, {useState, useEffect} from 'react'
import {Link, NavLink, useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios';
import Header_islogin from './Header_islogin';
import Card from './Card';
import RatingPopup from './RatingPopup';


export const DiningList=()=>{
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line no-restricted-globals
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const id = location.state ? location.state.userid : '';
  // var id3 = location.state && location.state.userid !== undefined ? location.state.userid : '';
  useEffect(()=>{
    axios
  .get("/applications/dining_spoon", { withCredentials: true })
  .then((response) => {
    setDiningSpoonData(response.data.data);
    console.log('dingS',response.data.data)
  })
  .catch((error) => {
    console.log('/applications/dining_spoon',error);
  });
  
  },[])
  console.log('id:'+id);
  useEffect(() => {
    if (id !== '') {
      axios
        .get(`/dining/all`, { withCredentials: true })
        .then((response) => {
          console.log(response.data);
          for(let i=0;i<response.data.length;i++){
            console.log('i='+i);
            if(response.data[i].writer_id==id){
              console.log('if문안으로들어온데이타'+response.data[i]);
              
             setPosts(posts=>[...posts,response.data[i]]);
            
            }
            
          }
          
          console.log(posts);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else console.log('아이디 전달 안됨');
    setUserId(id);
  }, []);
  console.log(id);
  console.log(userId);

   // RatingPopup추가부분
   const [showPopupPosts, setShowPopupPosts] = useState(true); // filteredPosts의 handleRatingClose
   const [showPopupPosts2, setShowPopupPosts2] = useState(true); // filteredPosts2의 handleRatingClose
   const [diningSpoonData, setDiningSpoonData] = useState([]);
   const [filteredPosts, setFilteredPosts] = useState([]); // 초기값을 빈 배열로 설정
   const [filteredPosts2, setFilteredPosts2] = useState([]); // 초기값을 빈 배열로 설정
 
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/dining/all', { withCredentials: true });
        const allposts = response.data;

        const now = new Date();
        const threshold = 2 * 60 * 60 * 1000; //2시간

        const spoonResponse = await axios.get("/applications/dining_spoon", { withCredentials: true });
        const diningSpoonData = spoonResponse.data.data;
        setDiningSpoonData(diningSpoonData);

        const filteredPosts = allposts.filter((post) => {
          const { hour, minute, day, month } = post;
          const postTime = new Date(now.getFullYear(), month - 1, day, hour, minute);
          const elapsedTime = now - postTime;
          const isOwner = post.writer_id === id;
          return isOwner && elapsedTime >= threshold;
        });

        setFilteredPosts(filteredPosts);

        const isAttender = diningSpoonData.some((spoon) => spoon.username === id && spoon.selectionStatus === 1);

        const filteredPosts2 = allposts.filter((post) => {
          const { hour, minute, day, month } = post;
          const postTime = new Date(now.getFullYear(), month - 1, day, hour, minute);
          const elapsedTime = now - postTime;
// if (isAttender && elapsedTime >= threshold)
          if (isAttender) {
            const matchingSpoon = diningSpoonData.find((spoon) => spoon.username === id && spoon.selectionStatus === 1);
            const matchingPostNumber = matchingSpoon.diningId;
            return post.diningId === matchingPostNumber;
          }

          return false;
        });

        setFilteredPosts2(filteredPosts2);

      } catch (error) {
        console.error('Error fetching dining_spoon data:', error);
      }
    };

    fetchData();
  }, [id]);

  
   
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
 

 console.log('diningSpoonData',diningSpoonData);
 


    return(
        <div className="MyPage">
          <Header_islogin userid={id}/>
          {/* RatingPopup 추가부분 팝업 컴포넌트 표시 */}
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

          <div className="background">
            <div className='content'>
            <div className='title'><h3>밥상목록</h3></div>
            <div className='mycard'>
            {
            posts.map((post) => (
              
              <Card 
                accessuserid={id}
                id={post.diningId} 
                userid={post.writer_id}
                title={post.dining_title}
                thumbnail={post.dining_thumbnail}
                restaurantname={post.restaurant_name}
                hour={post.hour}
                minute={post.minute}
                day={post.day}
                month={post.month}
                
                writemonth={post.writemonth}
                writeday={post.writeday}
                endmonth={post.endmonth}
                endday={post.endday}

               // attendcounter
               // attender1={post.attender1}
               // attender2={post.attender2}
               // attender3={post.attender3}
                region={post.restaurant_location}
                //maxattender={post.maxattender}
                introduction={post.dining_description}
              />
            ))
          }
            
            </div>
            </div>
            
            <div className='sidebar'>    
              <div className='profile'> {id}님<br></br></div> 
              <div className='list'>  
              <label for="listcss">
              <ul>
                <li><Link to={"/DiningList"} state={{userid: id}}>밥상 목록</Link></li>
                {/* <li><NavLink style={activeStyle} to='/DiningList' onClick={godininglist}>밥상 목록</NavLink></li> */}
              {/* NavLink로 state를 보낼 때 ''빈 값이 보내지는 오류 */}
                <br></br>
                <br></br>
                <li><Link to={"/Profile"} state={{userid: id}}>내 프로필</Link></li>
                <li><Link to={"/MyScore"} state={{userid: id}}>식사 매너 온도</Link></li>
                <li><Link to={"/Message"} state={{userid: id}}>쪽지함</Link></li>
                <br></br>
                <br></br>
                <li><Link to={"/Main"}>로그아웃</Link></li>
              
              </ul>      

              </label>         
              </div>
            </div>
          </div>
        </div>


    );



}
export default DiningList;
