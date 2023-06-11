import axios from 'axios';
import React, { useState, useEffect,useCallback,useRef } from 'react';
import './CommentCard.css';
const CommentCard=(props)=>{
    
    
    const writerid=props.writerid;
    
   
    const commentpostid=props.commentpostid;
    const writeminute=props.writeminute;
    const writehour=props.writehour;
    const comment=props.comment;
    const writemonth=props.writemonth;
    const writeday=props.writeday;
      
    
    return(
                   <div className="CommentCard" >
                    <div className='CommentCard2'>
                       <div className='commenttitle'>    {writerid}님</div>
                       <div className='commentcontent'>     {comment} </div>
                       <br></br>
                       <div className="date">    {writemonth}월{writeday}일 {writehour}:{writeminute}</div>
                       </div>
                       <br></br>
                  </div>
    )
  };
  export default CommentCard;