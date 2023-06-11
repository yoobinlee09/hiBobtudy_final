import React, { useState, useEffect,callback,useCallback,useRef } from 'react';


import { useNavigate,useLocation } from "react-router-dom";

import axios from 'axios';
import Header_islogin from './Header_islogin';
const { kakao } = window;
export default function Searchrestaurant(props) {
   
  const navigate = useNavigate();
    const location = useLocation();
    // eslint-disable-next-line no-restricted-globals
    let res=props.keyword;
    
   // 마커를 담을 배열입니다
   useEffect(()=>{
   
    let res=props.keyword;
    console.log(res);
   
    var markers = [];
   var infowindow = new kakao.maps.InfoWindow({zIndex:1});

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };  
    
    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption); 
    
    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(); 
    
    // 키워드로 장소를 검색합니다
    ps.keywordSearch('역전', placesSearchCB); 
    
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
    
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new kakao.maps.LatLngBounds();
    
            for (var i=0; i<data.length; i++) {
                displayMarker(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }       
    
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        } 
    }
    
    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
        
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });
    
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }
        
       
   
  },[])
  
    
      
      
       
    return (
      
      <div className="Searchrestaurant">
         
        key={props.keyword}
        <div className="map_wrap">
           <div id="map" style={{marginLeft:'15%', width:'70%',height:'100%',position:'relative',overflow:'hidden'}}></div>

            <div id="menu_wrap" className='bg_white'>
             <div className='option'>
             <div>
                <form>
                     <input type="text"   value={props.keyword} id='keyword' size="15"/> 
                   
                </form>
            </div>
                     </div>
        
    

         
      </div>
    </div>
    
      </div>
    );
    }