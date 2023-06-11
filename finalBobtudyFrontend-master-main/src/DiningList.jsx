import './DiningList.css';
import React, {useState, useEffect} from 'react'
import {Link, NavLink, useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios';
import Header_islogin from './Header_islogin';
import Card from './Card';


export const DiningList=()=>{
  const activeStyle = {
    color: 'black',
    fontWeight: 550,
    border : "black",
    textDecoration: 'none',
  };
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line no-restricted-globals
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const id = location.state ? location.state.userid : '';
  // var id3 = location.state && location.state.userid !== undefined ? location.state.userid : '';


  useEffect(() => {
    if (id !== '') {
      axios
        .get(`/posts?userid=${id}`)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else console.log('아이디 전달 안됨');
    setUserId(id);
  }, [id]);
  console.log(id);
  console.log(userId);

    return(
        <div className="MyPage">
          <Header_islogin userid={id}/>

          <div className="background">
            <div className='content'>
            <div className='title'><h3>밥상목록</h3></div>
            <div className='mycard'>
            {
            posts.map((post) => (
              <Card key={post.id}
                userid={post.userid}
                title={post.title}
                thumbnail={post.thumbnail}
                restaurantname={post.restaurantname}
                hour={post.hour}
                minute={post.minute}
                day={post.day}
                month={post.month}
                attendcounter={post.attendcounter}
                attender1={post.attender1}
                attender2={post.attender2}
                attender3={post.attender3}
                region={post.region}
                maxattender={post.maxattender}
                introduction={post.introduction}
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
                <li><Link to={"/Profile"} state={{userid: id}}>식사 매너 온도</Link></li>
                <li><Link to={"/Profile"} state={{userid: id}}>쪽지함</Link></li>
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
