import './Message.css';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header_islogin from './Header_islogin';

const Message = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const location = useLocation();
  const id = location.state ? location.state.userid : '';
  const inputReceiverRef = useRef("");
  const inputMessageTitleRef = useRef("");
  const inputMessageContentRef = useRef("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessage2, setSelectedMessage2] = useState(null);
  
  useEffect(() => {
    setUserId(id);
    getReceivedMessages();
    getSentMessages();
  }, [userId]);

  // 받은 메세지함
  const getReceivedMessages = async () => {
    try {
      const res = await axios.get(`/messages/received/${id}`, { withCredentials: true });
      setReceivedMessages(res.data.data);
      console.log('receivedMessages',res.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  // 보낸 메세지함
  const getSentMessages = async () => {
    try {
      const res = await axios.get(`/messages/sent/${id}`, { withCredentials: true });
      setSentMessages(res.data.data);
      console.log('sentMessages',res.data.data)
    } catch (error) {
      console.log(error);
    }
  };


  const checkUserExists = async () => {
    try {
      const inputReceiver = inputReceiverRef.current.value
      console.log('inputReceiver',inputReceiver, typeof inputReceiver)

      const res = await axios.get(`/memberInfo/${inputReceiver}`, { withCredentials: true });
      if ([res.data.data].length) {
        alert("존재하는 유저입니다.");
      } else {
        alert("해당 유저가 없습니다.");
        
        
      }
    } catch (error) {
      console.log(error);
      alert("해당 유저가 없습니다.");
    }
  };

  const sendMessage = async () => {
    try {
      const inputReceiver = inputReceiverRef.current.value;
      const inputMessageTitle = inputMessageTitleRef.current.value;
      const inputMessageContent = inputMessageContentRef.current.value;
      console.log(typeof inputReceiverRef.current.value);
      const message = {
        sender: userId,
        receiver: inputReceiver,
        message_title: inputMessageTitle,
        message_content: inputMessageContent,
        message_date: new Date().toISOString().slice(0, 10),
      };
  
      await axios.post("/messages", message, { withCredentials: true });
      alert("메시지가 성공적으로 전송되었습니다.");

      // 업데이트된 메시지 목록 다시 불러오기
      getReceivedMessages();
      getSentMessages();
    } catch (error) {
      console.log(error);
      alert("해당 유저가 존재하지 않습니다");
    }
  };

  const openMessageDetails = (message) => {
    setSelectedMessage(message);
  };

  const closeMessageDetails = () => {
    setSelectedMessage(null);
  };

  const openMessageDetails2 = (message2) => {
    setSelectedMessage2(message2);
  };

  const closeMessageDetails2 = () => {
    setSelectedMessage2(null);
  };

  let [tab, setTab] = useState(0);

  const TabContent = () => {
    switch (tab) {
      // 보낸 쪽지함
      case 0:
        return (
          <div>
            <p className="message" style={{ whiteSpace: 'pre', margin: '0' }}>
              <span style={{ width: '30%', display: 'inline-block' }}>받은 사람</span>
              <span style={{ width: '40%', display: 'inline-block' }} className="messagetitle">제목</span>
              <span style={{ width: '30%', display: 'inline-block' }}>날짜</span>
            </p>
            <br />
            {sentMessages.map((message) => (
              <div
                key={message.id}
                className="message"
                onClick={() => openMessageDetails(message)}
              >
                <span style={{ width: '30%', display: 'inline-block' }}>{message.reciver}</span>
                <span style={{ width: '40%', display: 'inline-block' }} className="messagetitle">{message.message_title}</span>
                <span style={{ width: '30%', display: 'inline-block' }}>{message.message_date}</span>
              </div>
            ))}
          </div>
        );
      case 1:
        // 받은 쪽지함
        return (
          <div >
            <p className="message" style={{ whiteSpace: 'pre', margin: '0' }}>
              <span style={{ width: '30%', display: 'inline-block' }}>보낸 사람</span>
              <span style={{ width: '40%', display: 'inline-block' }} className="messagetitle">제목</span>
              <span style={{ width: '30%', display: 'inline-block' }}>날짜</span>
            </p>
            <br />
            {receivedMessages.map((message2) => (
              <div
                key={message2.id}
                className="message"
                onClick={() => openMessageDetails2(message2)}
              >
                <span style={{ width: '30%', display: 'inline-block' }}>{message2.sender}</span>
                <span style={{ width: '40%', display: 'inline-block' }} className="messagetitle">{message2.message_title}</span>
                <span style={{ width: '30%', display: 'inline-block' }}>{message2.message_date}</span>
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div>
            <div className='sendContent'>
              <div className='inputReceiver'>
              <input
                type="text"
                ref={inputReceiverRef}
                className='inputReceiver'

                placeholder="받는 사람"
              />
              <button className='id-search-button' onClick={checkUserExists}>검색</button>

              </div>

              <input
                type="text"
                ref={inputMessageTitleRef}
                placeholder="제목"
                className='inputMessageTitle'
              />
              <input
                type="text"
                ref={inputMessageContentRef}
                placeholder="내용"
                className='inputMessageContent'
              />
              <button className='sendButton' onClick={sendMessage}>전송</button>
            </div>
          </div>
        );
      default:
        return <div></div>;
    }
  }

  return (
    <div className="Message">
      <Header_islogin userid={userId} />

      <div className="background2">
        <div className='content2'>
          <div className='title2'><h3>쪽지함</h3></div>
          <div className='MessageBoxButton-container'>
          <button className={`SendBox-button ${tab === 0 ? 'active' : ''}`} onClick={() => { setTab(0) }}>보낸쪽지함</button>
          /
          <button className={`ReceiveBox-button ${tab === 1 ? 'active' : ''}`} onClick={() => { setTab(1) }}>받은쪽지함</button>
            <button className="MessageSend-button" onClick={() => { setTab(2) }}>쪽지보내기</button>
          </div>
          <TabContent />
          {selectedMessage && (
            <div className="message-details">
              <p>보낸 사람: {userId}</p>
              <p>받은 사람: {selectedMessage.reciver}</p>
              <p>제목: {selectedMessage.message_title}</p>
              <p>내용: {selectedMessage.message_content}</p>
              <button className='message-close-button' onClick={closeMessageDetails}>닫기</button>
            </div>
          )}

{selectedMessage2 && (
            <div className="message-details">
              <p>보낸 사람: {selectedMessage2.sender}</p>
              <p>받은 사람: {userId}</p>
              <p>제목: {selectedMessage2.message_title}</p>
              <p>내용: {selectedMessage2.message_content}</p>
              <button className='message-close-button' onClick={closeMessageDetails2}>닫기</button>
            </div>
          )}
        </div>

        <div className='sidebar'>
          <div className='profile'> {userId}님<br></br></div>

          <div className='list'>
            <ul>
              <li><Link to={"/DiningList"} state={{ userid: userId }}>밥상 목록</Link></li>
              <br></br>
                <br></br>
              <li><Link to={"/Profile"} state={{ userid: userId }}>내 프로필</Link></li>
              <li><Link to={"/MyScore"} state={{ userid: userId }}>식사 매너 온도</Link></li>
              <li><Link to={"/Message"} state={{ userid: userId }}>쪽지함</Link></li>
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

export default Message;
