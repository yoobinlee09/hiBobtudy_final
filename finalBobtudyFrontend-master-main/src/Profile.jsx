import './Profile.css';
import React, {useState,useEffect} from 'react'
import {Link, useNavigate,useLocation , NavLink} from 'react-router-dom';

import axios from 'axios';
import Header_islogin from './Header_islogin';
import MyPage from './MyPage';

  export const Profile=(props)=>{  
      const navigate = useNavigate();
      const location = useLocation();
      const [users, setUsers] = useState([]);
      const [userId, setUserId] = useState("");
      const id = location.state ? location.state.userid : '';


      

      useEffect(() => {
        setUserId(id);
        
        axios.get(`/memberInfo/${id}`)
          .then((response) => {
            setUsers([response.data.data]);
            console.log('성공',[response.data.data])
          })
          .catch((error) => {
            console.log('안됨',error);
          });
      }, [id]);
      console.log(userId);
    

      

    return (

        <div className="Profile">
        <Header_islogin userid={id}/>

        <div className="background2">
          <div className='content2'>
          <div className='title2'><h3>내 프로필</h3></div>   
          <div className='user_list'>
            {
              users.map((userdb)=>(
                <ul>            
                  <li>아이디: {userdb.username}</li>            
                  <li>나이:{userdb.age}</li>             
                  {/* <li>Email: {userdb.email}</li>              */}
                  <li>{userdb.gender === "male" ? "성별: 남성" : "성별: 여성"}</li>             
                  </ul>

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
  export default Profile;