import './MyScore.css';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header_islogin from './Header_islogin';

export const MyScore = () => {
  const location = useLocation();
  const [scores, setScores] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const id = location.state ? location.state.userid : '';
  const [userId, setUserId] = useState("");

  useEffect(() => {
    axios.get(`/memberInfo/${id}`, { withCredentials: true })
      .then((response) => {
        setUserInfo(response.data.data); // setUserInfo를 배열이 아니라 객체로 설정합니다.
        console.log('info성공', response.data.data)
      })
      .catch((error) => {
        console.log('안됨', error);
      });
  }, [id]);

  const reviewCount = userInfo ? userInfo.mannerScoreCount : 0; // userInfo가 없으면 0으로 초기화
  const averageScore = userInfo ? userInfo.manner_score : 0; // userInfo가 없으면 0으로 초기화
  const mannerTemp = parseFloat((36.5 + reviewCount * 0.3 + averageScore * 0.8).toFixed(1));


  return (
    <div className="MyPage">
      <Header_islogin userid={id} />

      <div className="background">
        <div className="content">
          <div className="title">
            <h3>식사매너온도</h3>
          </div>
          <div className="OwnScore">
            {reviewCount === 0 ? (
              <p>평가받은 적이 없습니다</p>
            ) : (
              <>
                <p>{userId}님의 평균별점은 {averageScore}/5 입니다</p>
                <p>
                  식사매너온도는{' '}
                  <span className="mannerTemp">{mannerTemp}도</span>입니다
                </p>
                <p>총 {reviewCount} 명에게 평가받았습니다</p>
                <div className='mannerTempdesc'>식사매너온도는 기본온도 36.5도에 평가 횟수X0.3에 평균별점X0.8을 한 값입니다</div>
              </>
            )}
          </div>
        </div>

        <div className="sidebar">
          <div className="profile"> {id}님<br /></div>
          <div className="list">
            <label for="listcss">
              <ul>
                <li>
                  <Link to={"/DiningList"} state={{ userid: id}}>
                    밥상 목록
                  </Link>
                </li>
                <br />
                <br />
                <li>
                  <Link to={"/Profile"} state={{ userid: id}}>
                    내 프로필
                  </Link>
                </li>
                <li>
                  <Link to={"/MyScore"} state={{ userid: id }}>
                    식사 매너 온도
                  </Link>
                </li>
                <li>
                  <Link to={"/Message"} state={{ userid: id}}>
                    쪽지함
                  </Link>
                </li>
                <br />
                <br />
                <li>
                  <Link to={"/Main"}>로그아웃</Link>
                </li>
              </ul>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyScore;
