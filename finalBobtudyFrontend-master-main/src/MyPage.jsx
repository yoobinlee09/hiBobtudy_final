import './MyPage.css';
import React, {useState, useEffect} from 'react'
import {Link, useNavigate,useLocation , NavLink} from 'react-router-dom';
import axios from 'axios';
import Header_islogin from './Header_islogin';
import Card from './Card';


export const MyPage=()=>{
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line no-restricted-globals
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const id = location.state ? location.state.userid : '';
 
  console.log(id);
  



  // useEffect(() => {
  //   setUserId(id);
    
  //   axios.get(`http://localhost:3001/posts?userid=${id}`)
  //     .then((response) => {
  //       setPosts(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [id]);
  // console.log(userId);

    return(
        <div className="MyPage">
          <Header_islogin userid={id}/>


          <div className="background">
            {/* <div className='content'></div>             */}
            
            <div className='sidebar'>    
              <div className='profile'> {id}님<br></br></div> 
              
              <div className='list'>  

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


      
              </div>
            </div>
          </div>
        </div>

    );



}
export default MyPage;