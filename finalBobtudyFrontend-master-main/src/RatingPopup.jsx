import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import "./RatingPopup.css";

const RatingPopup = ({ post, yourUserId, onClosePosts, onClosePosts2, diningSpoonData, filteredPosts, filteredPosts2, type }) => {
  const [diningScores, setDiningScores] = useState({});
  const [attenderIds, setAttenderIds] = useState([]);

  const handleDiningScoreChange = (userId, score) => {
    setDiningScores((prevDiningScores) => ({
      ...prevDiningScores,
      [userId]: score,
    }));
  };
  useEffect(() => {
    setDiningScores({});
    
    const matchedSpoons = diningSpoonData.filter(spoon => spoon.diningId === post.diningId && spoon.selectionStatus === 1);
    const attenderIds = matchedSpoons.map(spoon => spoon.username);
    setAttenderIds(attenderIds);
  }, [post, diningSpoonData]);

  // attenderIds가 변경될 때마다 콘솔에 출력
  useEffect(() => {
    console.log('참석자들:', attenderIds);
  }, [attenderIds]);

  const handleDiningScoreConfirmationPosts = async () => {
    try {
      const scorePromises = [];
  
      if (attenderIds.length > 0) {
        attenderIds.forEach((attenderId, index) => {
          const data = {
            username: attenderId, // 평가 받는 사람의 ID
            manner_score: diningScores[attenderId] || 0, // 평점 (기본값은 0)
          };
          console.log(`참석자 ${index + 1}:`, data);
          console.log(typeof diningScores[attenderId])
  
          scorePromises.push(axios.put('/members/mannerscore', data, { withCredentials: true }));
        });
      } else {
        console.log('평가할 사람이 없습니다.');
      }
  
      if (scorePromises.length > 0) {
        const responses = await Promise.all(scorePromises);
        console.log('별점 데이터 전송 완료:', responses.map(response => response.data.data));
      }
    } catch (error) {
      console.error('별점 데이터 전송 실패:', error);
    }
  
    if (type === "posts") {
      onClosePosts();
    } else if (type === "posts2") {
      onClosePosts2();
    }
  };
  
// 한꺼번에 점수 보내기 위해 Promise.all(scorePromises)
const handleDiningScoreConfirmationPosts2 = async () => {
  try {
    const scorePromises = [];

    console.log("filteredPosts2.includes(post)",filteredPosts2.includes(post));
    console.log(typeof diningScores[post.writer_id]);
    const data = {
      username: post.writer_id, // 밥장의 ID 값
      manner_score: diningScores[post.writer_id], // 평점
    }
    scorePromises.push(
      axios.put('/members/mannerscore', data, { withCredentials: true })
    );

    if (scorePromises.length > 0) {
      const responses = await Promise.all(scorePromises);
      console.log(responses.map(response => response.data.data), '점수',data);
    }
  } catch (error) {
    console.error('별점 데이터 전송 실패:', error);
  }

  if(type==='posts2'){
    onClosePosts2();
  }
};

  return (
    <div>
      {/* filteredPosts && filteredPosts.length > 0 && */}
      {attenderIds.length > 0 && filteredPosts.length > 0 && (
        <div className='popupPosts'>
          <p>
            {filteredPosts[0].dining_title}에서 식사 맛있게 하셨나요? <br />{yourUserId}밥장님! 같이 식사한 참여자들에게 각각 별점을 매겨주세요:
          </p>
          <div>
            {filteredPosts[0] && attenderIds.map((attenderId, index) => (
              <div key={attenderId}>
                <p>{attenderId}
                  <StarRating
                    value={diningScores[attenderId] || 0} // 평점 (기본값은 0)
                    onChange={(score) => handleDiningScoreChange(attenderId, score)}
                  />
                </p>
              </div>
            ))}         
          </div>
          <div className="button-container">
            <button className="rating-confirm-button" onClick={handleDiningScoreConfirmationPosts}>별점 매기기</button>
            <button className="rating-close-button" onClick={onClosePosts}>닫기</button>
          </div>
        </div>
      )}

      {filteredPosts2 && filteredPosts2.some((filteredPost) => filteredPost === post) && (
        <div className='popupPosts2'>
          <p>
            {yourUserId}님! {post.dining_title}에서 식사 맛있게 하셨나요? <br />밥장 {post.writer_id}님에게 별점을 매겨주세요
          </p>
          {filteredPosts2.map((filteredPost2) => (
            <div key={filteredPost2.diningid}>
              {filteredPost2.writer_id && (
                <div>
                  <p>{filteredPost2.writer_id}
                    <StarRating
                      value={diningScores[filteredPost2.writer_id] || 0} // 평점 (기본값은 0)
                      onChange={(score) => handleDiningScoreChange(filteredPost2.writer_id, score)}
                    />
                  </p>
                </div>
              )}
            </div>
          ))}
          <div className="button-container">
            <button className="rating-confirm-button" onClick={handleDiningScoreConfirmationPosts2}>별점 매기기</button>
            <button className="rating-close-button" onClick={onClosePosts2}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingPopup;
