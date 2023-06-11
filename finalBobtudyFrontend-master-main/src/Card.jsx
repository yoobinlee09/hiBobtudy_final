import React, { useState } from "react";
import './Card.css';
import locate from'./imgs/locate.png';
import time from './imgs/time.png';
import { Navigate, useNavigate } from "react-router-dom";
const Card=(props)=>{
  const navigate=useNavigate();
  const hour=props.hour;
  const minute=props.minute;
  const userid=props.userid;
  const accessuserid=props.accessuserid;
  function hourcal(hour){
    if(hour>12){hour=hour-12;
    return "오후 "+hour;}
    else {return "오전 "+hour;}
  };
  function minutecal(minute){
    if(minute==0){
    return ;
    }
    else {
      return minute+"분";
    }
  };
  let attender=props.attender1;
  function showattender(attender){
    if(props.attender1==""){
      return;
    }
    else{return "확정된참여자: "}
  }
  const id=props.id;
  const posttitle=props.title;
  const region=props.region;
  const writemonth=props.writemonth;
  const writeday=props.writeday;
  const endmonth=props.endmonth;
  const endday=props.endday;
    const thumbnail=props.thumbnail;
    //const thumbnail=props.thumbnail1+props.thumbnail2+props.thumbnail3+props.thumbnail4+props.thumbnail5+props.thumbnail6+props.thumbnail7+props.thumbnail8+props.thumbnail9+props.thumbnail10;
    const month=props.month;
    const day=props.day;
    const restaurantname=props.restaurantname;
    const introduction=props.introduction;
    const maxattender=props.maxattender;
    const attendcounter=props.attendcounter;
    const attender1=props.attender1;
    const attender2=props.attender2;
    const attender3=props.attender3;
    const postnumber = props.postnumber;
    function gotoViewpost(){
      if(accessuserid==null){
        alert('로그인후 이용해주십시오.');
        return;
       }
       else{
      navigate('/Viewpost',{state : {
      id:id,
      userid:userid,
      postthumbnail:thumbnail,
      accessuserid:accessuserid,
      posttitle:posttitle,
      restaurantname:restaurantname,
      region:region,
      month:month,
      day:day,
      writemonth:writemonth,
      writeday:writeday,
     endmonth:endmonth,
      endday:endday,
      hour:hour,
      minute:minute,
      introduction:introduction,
      maxattender:maxattender,
      attendcounter:attendcounter,
      postnumber:postnumber,
      attender1:attender1,
      attender2:attender2,
      attender3:attender3
      }});
      console.log("상세조회에 넘어가는 게시글제목:"+posttitle,postnumber);
    }
    }
   
  return(
                 <div className="Card" >
                  <div className="cardbody">
                  <img src={thumbnail} className="vh"/>
                  <div className="vh2"></div>
                  <div className="info">  
                   {props.title}
                   </div>
                   <div className="vh2"></div>
                    <div className="subinfo">
                      <img src={locate}/>
                    {props.restaurantname}
                    <div className="vh2"></div>
                    <img src={time}/> {props.month}월 {props.day}일 {hourcal(hour)}시{minutecal(minute)}
                    <div className="vh2"></div>
                    </div>
                    <div className="attendmessage">{props.attendcounter}명이 신청했어요 <br></br>밥장 {props.userid} 님  <button className="viewbutton"onClick={gotoViewpost}>밥상 자세히보기</button></div>
                    <br></br>
                    
                    <div className="bottom">
                    {/*{showattender(attender)}{props.attender1}  {props.attender2}  {props.attender3} */}
                    </div>
                   
                  </div>
                </div>
  )
};
export default Card;