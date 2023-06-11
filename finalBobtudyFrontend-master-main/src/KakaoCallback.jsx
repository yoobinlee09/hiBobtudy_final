import React,{useEffect} from "react";
import axios from "axios";
import {Link, NavLink, useNavigate,useLocation} from 'react-router-dom';
const KakaoCallback=()=>{
    const navigate = useNavigate();
    useEffect(()=>{
        const params=new URL(document.location.toString()).searchParams;
        const code=params.get('code');
        const grant_type='authorization_code';
        const client_id='9ee85c26ac5bcf30210926a27263816e';
        const REDIRECT_URI='http://localhost:3000/oauth/kakao/callback';
        const posturi='https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=9ee85c26ac5bcf30210926a27263816e&redirect_uri=http://localhost:3000/oauth/kakao/callback&code='+code;
        axios.post(posturi,
        {},{
            headers:{
                "Content-Type":
                "application/x-www-form-urlencoded;charset=utf-8",

            },
        }
    )
    .then((res)=>{
        
        console.log(res.data);
        const {data}=res;
        const {access_token}=data;
        if(access_token){
            console.log('Bearer'+{access_token});
            
            axios.post('https://kapi.kakao.com/v2/user/me',{},{
                headers:{
                    Authorization:`Bearer ${access_token}`,
                    "Content-type":"application/x-www-form-urlencoded",
                },
            }).then((res)=>{
                console.log("데이터성공:");
                console.log(res.data.kakao_account);
                
        
                const id=res.data.kakao_account.profile.nickname;
                
                    navigate('/Main_islogin',{state : {userid:id}});
               
                
      
            });
        }else{
            console.log('access_token없음');
        }
    });
    },[]);
    return<></>;
}
export default KakaoCallback;