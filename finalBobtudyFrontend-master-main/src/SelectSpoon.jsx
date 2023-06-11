import React, { useState, useEffect,callback,useCallback,useRef } from 'react';
import './SelectSpoon.css';
import { Navigate, useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import Header_islogin from './Header_islogin';

export default function SelectSpoon(props) {
  const navigate=useNavigate();
  const location = useLocation();
  const [selectedSpoonId, setSelectedSpoonId] = useState("");
  const [diningSpoonList, setDiningSpoonList] = useState([]);


  const accessuserid= (location.state && location.state.accessuserid) || "";

  const postnumber =location.state.postnumber;
  const userid =  (location.state && location.state.id2) || "";
    // console.log(id2)
  // const postid=location.state.postid;
  // const id2 = location.state.id2;
    // 겸상자 선택 attender 추가 완료 팝업
    const [showAddAttenderPopup, setAddAttenderPopup] = useState(false);
    const [MyPostDetail, setMyPostDetail] = useState([]);
  

    const goBack = () => {
        navigate(-1);
      };
      // 겸상자 선택 attender 추가 완료 팝업 닫기
      const handleAddAttenderPopupClose = useCallback(() => {
          setAddAttenderPopup(false);
        }, []); 



          // diningSpoonList, 겸상db 전체 조회 겸상신청한 내용 리스트로 저장 
          useEffect(() => {
            axios
              .get('/applications/dining_spoon')
              .then((response) => {
                const allApplications = response.data.data; // 응답 데이터에서 배열 데이터를 추출
                const allApplicants = allApplications.filter(
                  (item) => item.diningId === postnumber
                );
                setDiningSpoonList(allApplicants);
              })
              .catch((error) => {
                console.log('전체조회', error);
              });
          }, []);
          

    //겸상자 선택 후 posts 업데이트 0603 수정
    const [MyPost, setMyPost] = useState([]); 
    // post 현재 게시글 겸상 db
    useEffect(() => {
      axios.get(`/applications/${postnumber}`)
      .then((response) => {
        setMyPost(response.data.data);        
        console.log('response.data',response.data.data);

      })
      .catch((error) => {
        console.log(error);
      });
    }, [postnumber]);

    useEffect(() => {
      axios.get(`/dining/${postnumber}`)
          .then((response) => {
              setMyPostDetail(response.data.data);
              console.log('MyPostDetail',response.data.data)
          })
          .catch((error) => {
              console.log(error);
          });
  }, [postnumber]);

   
  // 겸상자 선택
const handleSpoonSelection = (spoonId) => {  
  // dining_spoon의 attending status를 true로 업데이트
  // const diningSpoon = diningSpoonList.find(spoon => spoon.usersname === spoonId && spoon.diningId === postnumber);
  const diningSpoon = MyPost
  console.log(diningSpoon)
  
  if (diningSpoon) {
    console.log('확인',postnumber+accessuserid)
    axios.put(`/applications/select`, {
      diningId: postnumber,
      username: spoonId
    })

    .then((response) => {
      console.log('Dining Spoon attending 업데이트', response.data);
      setSelectedSpoonId(spoonId);
      console.log('아이디',spoonId)
      setAddAttenderPopup(true);

      // 밥장이 겸상자를 선택하면 쪽지를 보내는 부분 나중 추가   
      const message = {
        sender: userid,
        receiver: spoonId,
        message_title: `${userid}님과 같이 겸상해요`,
        message_content: `${MyPostDetail.month}월 ${MyPostDetail.day}일 ${MyPostDetail.hour}시${MyPostDetail.minute}분에 ${userid}님과 ${MyPostDetail.restaurant_name}에서 밥먹어요! 장소는 ${MyPostDetail.restaurant_location}입니다. 즐거운 식사 되세요!`,
        message_date: new Date().toISOString().slice(0, 10),
    };
    
      axios.post("/messages", message)
        .then(() => {
          alert("메시지가 성공적으로 전송되었습니다.");
        })
        .catch((error) => {
          console.log(error);
          alert("메시지 전송에 실패했습니다.");
        });
    
    })
    .catch((error) => {
      console.log('겸상자선택put',error);
    });
  }
};
// 전체 업데이트
useEffect(() => {
  if (selectedSpoonId) {
    axios
      .get('/applications/dining_spoon')
      .then((response) => {
        const allApplications = response.data.data;
        const allApplicants = allApplications.filter(
          (item) => item.diningId === postnumber
        );
        setDiningSpoonList(allApplicants);
      })
      .catch((error) => {
        console.log('전체업데이트조회', error);
      });
  }
}, [selectedSpoonId]);

  // const attendingSpoons = diningSpoonList.filter(spoon => spoon.diningId === postnumber && spoon.attending === 0);
  // const attendingSpoons = MyPost;
  
// const renderSpoonButtons = () => {

//   const attendingSpoons = MyPost.filter(spoon => spoon.selectionStatus === 0)
//   console.log('MyPost',MyPost)

//   if (attendingSpoons.length === 0) {
//     return <div className='AttendingContent'>아직 신청한 사람이 없습니다</div>;
//   }

//   return (
//     <div className="button-container2">
//       {attendingSpoons.map(spoon => (
//         <button
//           key={spoon.spoon_id}
//           className="spoonbutton2"
//           onClick={() => handleSpoonSelection(spoon.username)}
//         >
//           <div className="button-content">
//             <div className="font-button">{spoon.username}</div>
//             <div className="description-button">{spoon.application_message ? spoon.application_message : ""}</div>
//           </div>
          
//           <div className='info'>          
//           <div>{spoon.gender}</div>
//           <div>{Math.floor(spoon.age/10)}0대</div>
//           </div>
//         </button>
//       ))}
//     </div>
//   );
// };
// 0603수정
const renderSpoonButtons = () => {
  // diningSpoonList에서 selectionStatus가 0인 사람만 선택합니다.
  const ApplyingSpoons = diningSpoonList.filter(spoon => spoon.selectionStatus === 0);

  if (ApplyingSpoons.length === 0) {
    return <div className='AttendingContent'>아직 신청한 사람이 없습니다</div>;
  }

  return (
    <div className="button-container2">
      {ApplyingSpoons.map(spoon => {
        // MyPost에서 현재 spoon의 username을 가진 데이터를 찾습니다
        // MyPost는 사용자정보, 신청 내역이 diningSpoonList는 겸상 신청 내역만
        const myPostData = MyPost.find(item => item.username === spoon.username);
        
        // myPostData가 없다면 다음 반복으로
        if (!myPostData) return null;

        return (
          <button
            key={spoon.id}  // button의 key를 unique하게 
            className="spoonbutton2"
            onClick={() => handleSpoonSelection(spoon.username)}
          >
            <div className="button-content">
              <div className="font-button">{myPostData.username}</div>
              <div className="description-button">{myPostData.application_message ? myPostData.application_message : ""}</div>
            </div>
            <div className='info'>          
              <div>{myPostData.gender === "female" ? "여성" : "남성"}</div>
              <div>{Math.floor(myPostData.age/10)}0대</div>
            </div>
          </button>
        )
      })}
    </div>
  );
};


// 겸상자 보여주는 팝업
const [showAttendPopup, setShowAttendPopup] = useState(false); // 팝업을 표시하기 위한 상태 추가
  // 겸상자 팝업 열기
  const handleAttendPopupOpen = () => {
    setShowAttendPopup(true);
  };

  // 겸상자 팝업 닫기
  const handleAttendPopupClose = () => {
    setShowAttendPopup(false);
  };





  return (
     
    <div className="SelectSpoon">
        <Header_islogin userid={accessuserid}/>
         <div className="SelectSpoon5">
         {showAddAttenderPopup && (
            <div className="AttendComplete">
              <div className="popup-title">{selectedSpoonId}님을 겸상자로 선택했습니다</div>
              <div className="button-container">
                <button className="close-button" onClick={handleAddAttenderPopupClose}>닫기</button>
              </div>
            </div>
          )}
            <div className="SelectSpoon3">
              {console.log('postid게시글 number',postnumber)}

            <div className="popup2">
        <div className='SelectTitle'>함께식사할 겸상신청자를 선택해주세요!
        {renderSpoonButtons()}</div>

        <div className="contentname"> 
        <div className="contentname">
  {/* 겸상자: {diningSpoonList.filter((spoon) => spoon.diningId === postnumber && spoon.selectionStatus).map((spoon) => spoon.username).join(' ')} */}
</div>

        </div>
        {/* <div className="button-container">
        </div> */}
       
        <div className="button-container">
        <button className="attender-button" onClick={handleAttendPopupOpen}>겸상자</button>
        {/* 0603 겸상자 수정 */}
        {showAttendPopup && (
                    <div className="AttenderPopup">
                      <div className='AttenderPopup-title'>겸상자</div>
                      {diningSpoonList.filter((spoon) => spoon.diningId === postnumber && spoon.selectionStatus).map((spoon) => spoon.username).join(' ')}

                      <div className="button-container">
                        <button className="close-button" onClick={handleAttendPopupClose}                  >
                          닫기
                        </button>
                      </div>
                    </div>
                  )}
        <button className="close-button" onClick={goBack} >닫기</button>
        {/* <button className="confirm-button" onClick={handleSelectConfirmClick}>확인</button>
        <button className="close-button" onClick={handleSelectPopupClose}>닫기</button> */}
        </div> 
       
        </div>
        </div> 
        </div> 




        <div>접근유저아이디출력 (테스트용):{accessuserid}</div>
    </div>
  );
}