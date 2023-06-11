import './Writepost.css';
import React, { useState, useEffect,callback,useCallback,useRef } from 'react';


import { useNavigate,useLocation } from "react-router-dom";

import axios from 'axios';
import Header_islogin from './Header_islogin';
import Searchrestaurant from './Searchrestaurant';
import MapContainer from './MapContainer';
import LandingPage from './LandingPage';
const { kakao } = window;
export default function Writepost() {

  const navigate = useNavigate();
    const location = useLocation();
    // eslint-disable-next-line no-restricted-globals
   const id= location.state.userid;
  
   // 마커를 담을 배열입니다
   {/*useEffect(()=>{
   var markers = [];
   
   var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
       mapOption = {
           center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
           level: 3 // 지도의 확대 레벨
       };  
   
   // 지도를 생성합니다    
   var map = new kakao.maps.Map(mapContainer, mapOption); 
   
   // 장소 검색 객체를 생성합니다
   var ps = new kakao.maps.services.Places();  
   
   // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
   var infowindow = new kakao.maps.InfoWindow({zIndex:1});
   
   // 키워드로 장소를 검색합니다
   searchPlaces();
   
   // 키워드 검색을 요청하는 함수입니다
   function searchPlaces() {
   
       var keyword = document.getElementById('keyword').value;
   
       
   
       // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
       ps.keywordSearch( keyword, placesSearchCB); 
   }
   
   // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
   function placesSearchCB(data, status, pagination) {
       if (status === kakao.maps.services.Status.OK) {
   
           // 정상적으로 검색이 완료됐으면
           // 검색 목록과 마커를 표출합니다
           displayPlaces(data);
   
           // 페이지 번호를 표출합니다
           displayPagination(pagination);
   
       } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
   
           alert('검색 결과가 존재하지 않습니다.');
           return;
   
       } else if (status === kakao.maps.services.Status.ERROR) {
   
           alert('검색 결과 중 오류가 발생했습니다.');
           return;
   
       }
   }
   
   // 검색 결과 목록과 마커를 표출하는 함수입니다
   function displayPlaces(places) {
   
       var listEl = document.getElementById('placesList'), 
       menuEl = document.getElementById('menu_wrap'),
       fragment = document.createDocumentFragment(), 
       bounds = new kakao.maps.LatLngBounds(), 
       listStr = '';
       
       // 검색 결과 목록에 추가된 항목들을 제거합니다
       removeAllChildNods(listEl);
   
       // 지도에 표시되고 있는 마커를 제거합니다
       removeMarker();
       
       for ( var i=0; i<places.length; i++ ) {
   
           // 마커를 생성하고 지도에 표시합니다
           var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
               marker = addMarker(placePosition, i), 
               itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
   
           // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
           // LatLngBounds 객체에 좌표를 추가합니다
           bounds.extend(placePosition);
   
           // 마커와 검색결과 항목에 mouseover 했을때
           // 해당 장소에 인포윈도우에 장소명을 표시합니다
           // mouseout 했을 때는 인포윈도우를 닫습니다
           (function(marker, title) {
               kakao.maps.event.addListener(marker, 'mouseover', function() {
                   displayInfowindow(marker, title);
               });
   
               kakao.maps.event.addListener(marker, 'mouseout', function() {
                   infowindow.close();
               });
   
               itemEl.onmouseover =  function () {
                   displayInfowindow(marker, title);
               };
   
               itemEl.onmouseout =  function () {
                   infowindow.close();
               };
           })(marker, places[i].place_name);
   
           fragment.appendChild(itemEl);
       }
   
       // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
       listEl.appendChild(fragment);
       menuEl.scrollTop = 0;
   
       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
       map.setBounds(bounds);
   }
   
   // 검색결과 항목을 Element로 반환하는 함수입니다
   function getListItem(index, places) {
   
       var el = document.createElement('li'),
       itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                   '<div class="info">' +
                   '   <h5>' + places.place_name + '</h5>';
   
       if (places.road_address_name) {
           itemStr += '    <span>' + places.road_address_name + '</span>' +
                       '   <span class="jibun gray">' +  places.address_name  + '</span>';
       } else {
           itemStr += '    <span>' +  places.address_name  + '</span>'; 
       }
                    
         itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                   '</div>';           
   
       el.innerHTML = itemStr;
       el.className = 'item';
   
       return el;
   }
   
   // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
   function addMarker(position, idx, title) {
       var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
           imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
           imgOptions =  {
               spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
               spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
               offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
           },
           markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
               marker = new kakao.maps.Marker({
               position: position, // 마커의 위치
               image: markerImage 
           });
   
       marker.setMap(map); // 지도 위에 마커를 표출합니다
       markers.push(marker);  // 배열에 생성된 마커를 추가합니다
   
       return marker;
   }
   
   // 지도 위에 표시되고 있는 마커를 모두 제거합니다
   function removeMarker() {
       for ( var i = 0; i < markers.length; i++ ) {
           markers[i].setMap(null);
       }   
       markers = [];
   }
   
   // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
   function displayPagination(pagination) {
       var paginationEl = document.getElementById('pagination'),
           fragment = document.createDocumentFragment(),
           i; 
   
       // 기존에 추가된 페이지번호를 삭제합니다
       while (paginationEl.hasChildNodes()) {
           paginationEl.removeChild (paginationEl.lastChild);
       }
   
       for (i=1; i<=pagination.last; i++) {
           var el = document.createElement('a');
           el.href = "#";
           el.innerHTML = i;
   
           if (i===pagination.current) {
               el.className = 'on';
           } else {
               el.onclick = (function(i) {
                   return function() {
                       pagination.gotoPage(i);
                   }
               })(i);
           }
   
           fragment.appendChild(el);
       }
       paginationEl.appendChild(fragment);
   }
   
   // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
   // 인포윈도우에 장소명을 표시합니다
   function displayInfowindow(marker, title) {
       var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
   
       infowindow.setContent(content);
       infowindow.open(map, marker);
   }
   
    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
   function removeAllChildNods(el) {   
       while (el.hasChildNodes()) {
           el.removeChild (el.lastChild);
       }
   }
  
   
  },[])*/}
  
    const goToback = () => {
      navigate(-1);
      
    };
        
        const [file, setFile] = useState(null);	//파일	
        const [imgBase64, setImgBase64] = useState(""); // 파일 base64
        const [imgBase641, setImgBase641] = useState([]);
        const [imgBase642, setImgBase642] = useState([]);
        const [imgBase643, setImgBase643] = useState([]);
        const [imgBase644, setImgBase644] = useState([]);
        const [imgBase645, setImgBase645] = useState([]);
        const [imgBase646, setImgBase646] = useState([]);
        const [imgBase647, setImgBase647] = useState([]);
        const [imgBase648, setImgBase648] = useState([]);
        const [imgBase649, setImgBase649] = useState([]);
        const [imgBase6410, setImgBase6410] = useState([]);
        const handleChangeFile = (event) => {
          setFile(event.target.files);
          setImgBase64('');
          
          for(var i=0;i<event.target.files.length;i++){
            if (event.target.files[i]) {
              let reader = new FileReader();
              reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장.
              // 파일 상태 업데이트
              reader.onloadend = () => {
                // 2. 읽기가 완료되면 아래코드가 실행.
                const base64 = reader.result;
                if (base64) {
                // 문자 형태로 저장
                var base64Sub = base64.toString()
              /*  var base64sub1=base64Sub.substr(0,20000);
                var base64sub2=base64Sub.substr(20000,20000);
                var base64sub3=base64Sub.substr(40000,20000);
                var base64sub4=base64Sub.substr(60000,20000);
                var base64sub5=base64Sub.substr(80000,20000);
                var base64sub6=base64Sub.substr(100000,20000);
                var base64sub7=base64Sub.substr(120000,20000);
                var base64sub8=base64Sub.substr(140000,20000);
                var base64sub9=base64Sub.substr(160000,20000);
                var base64sub10=base64Sub.substr(180000,20000);*/
               
               
                // 배열 state 업데이트
                setImgBase64(base64Sub);
                /*setImgBase641(base64sub1);
                setImgBase642(base64sub2);
                setImgBase643(base64sub3);
                setImgBase644(base64sub4);
                setImgBase645(base64sub5);
                setImgBase646(base64sub6);
                setImgBase647(base64sub7);
                setImgBase648(base64sub8);
                setImgBase649(base64sub9);
                setImgBase6410(base64sub10);
                console.log(base64sub1);
                console.log(base64sub2);
                console.log(base64sub3);
                console.log(base64sub4);
                console.log(base64sub5);
                console.log(base64sub6);
                console.log(base64sub7);
                console.log(base64sub8);*/
                console.log(id);
                }
              } 
            }
          }
      
        }
      
        function Send(){
         // const fd = new FormData();
          //Object.values(file).forEach((file) => fd.append("file", file));
            
          console.log(imgBase64);
          axios.post('/dining/save', {
            //userid:id,
            dining_title:posttile,
            restaurant_name:restaurantname,
            hour:hour,
            minute:minute,
            day:day,
            month:month,
            writeday:writeday,
            writemonth:writemonth,
            endmonth:endmonth,
            endday:endday,
            people_count:"0",
            //attender1:'',
            //attender2:'',
            //attender3:'',
            gender_check:genderset,
            restaurant_location:region,
            //maxattender:maxattender,
           
            dining_description:introduction,
            dining_thumbnail:imgBase64,
           /* thumbnail1:imgBase641,
            thumbnail2:imgBase642,
            thumbnail3:imgBase643,
            thumbnail4:imgBase644,
            thumbnail5:imgBase645,
            thumbnail6:imgBase646,
            thumbnail7:imgBase647,
            thumbnail8:imgBase648,
            thumbnail9:imgBase649,
            thumbnail10:imgBase6410,*/

          /*  headers: {
              "Content-Type": `multipart/form-data; `,
            },*/
         
          })
          .then((response) => {
            console.log("전송함");
            alert('밥상이 성공적으로 차려졌습니다!')
            
            goToback();
            
          })
          .catch((error) => {
            // 예외 처리
          })
        
        }
        const now=new Date();
        const writemonth=now.getMonth()+1;
        const writeday=now.getDate();

        const[key,setkey]=useState('');

        const[posttile,setposttile]=useState('');
        const[restaurantname,setrestaurantname]=useState('');
        const[region,setregion]=useState('');
        const[month,setmonth]=useState('');
        const[day,setday]=useState('');
        const[endmonth,setendmonth]=useState('');
        const[endday,setendday]=useState('');
        const[hour,sethour]=useState('');
        const[minute,setminute]=useState('');
        const[genderset,setgenderset]=useState('혼성');
        const[maxattender,setmaxattender]=useState('3');
        const[introduction,setintroduction]=useState('');

        const handlekey=(e)=>{
          setkey(e.target.value);
          console.log(key);
        }

        const handleposttitle=(e)=>{
          setposttile(e.target.value);
        }
        const handlerestaurantname=(e)=>{
          setrestaurantname(e.target.value);
        }
        const handleregion=(e)=>{
          setregion(e.target.value);
        }
        const handlemonth=(e)=>{
          setmonth(e.target.value);
        }
        const handleday=(e)=>{
          setday(e.target.value);
        }
        const handleendmonth=(e)=>{
          setendmonth(e.target.value);
        }
        const handleendday=(e)=>{
          setendday(e.target.value);
        }
        const handlehour=(e)=>{
          sethour(e.target.value);
        }
        const handleminute=(e)=>{
          setminute(e.target.value);
        }
        const handlegenderset=(e)=>{
          setgenderset(e.target.value);
        }
        const handlemaxattender=(e)=>{
          setmaxattender(e.target.value);
        }
        const handleintroduction=(e)=>{
          setintroduction(e.target.value);
        }
        const [notAllowpost,setNotAllowpost]=useState(true);
        const [imgBase64Valid,setimgBase64Valid]=useState(false);
        useEffect(()=>{
        
          if(imgBase64!=''){
            setimgBase64Valid(true);
      
          } else{
            setimgBase64Valid(false);
          }})
        useEffect(() => {
          if(imgBase64Valid){
            setNotAllowpost(false);
            return;
          }
          setNotAllowpost(true);
      
        },[imgBase64Valid]);
       
    return (
      
      <div className="Writepost">
         <Header_islogin userid={id} />
        <div className="writepost2">
          
          <div>
           
           <div className="none">
            </div>
            <div className="Logintitle">
                <h1>밥상 차리기</h1>
                
            </div>
                <p className="guide">밥상 이미지는 필수 입력입니다!</p>
            <p className='space_LoginPage'></p>
            <br></br>
            <div className="comment">밥상 제목</div>
            <div className="inputWrappost">
            <input value={posttile}
            onChange={handleposttitle}type='text' name="posttitle" placeholder="밥상 제목 입력" className="inputboxpost" ></input>
            </div>
            <br></br><br></br>

            
    

            <div className="comment">식당 이름</div>
            <div className="inputWrappost">
            <input value={restaurantname}
            onChange={handlerestaurantname}type='text' name="restaurantname" placeholder="식당 이름과 지점명 입력" className="inputboxpost" ></input>
           
            </div>
            <br></br><br></br>
            <div className="comment">주소 검색</div>
            <div className="writepost3">
            {/*<Searchrestaurant keyword={key}/>*/}
            <LandingPage/>
           
           </div>
            <br></br><br></br>

            <div className="comment">식당 주소</div>
            <div className="inputWrappost">
            <input value={region} type='text'
            placeholder="도부터 지번주소는 동, 도로명주소는 도로명까지 ex:강원도 속초시 노학동 또는 관광로327" onChange={handleregion} id="region" className="inputboxpost">
                
            </input>
            </div>
            <br></br><br></br>

            <div className="comment">식사 일시 </div>
            <div className="inputWrappost">
            <input value={month}
            onChange={handlemonth} type='text' name="month" placeholder="달" className="inputdatepost" ></input>
            <input value={day}
            onChange={handleday} type='text' name="day" placeholder="날짜" className="inputdatepost" ></input>
            <input value={hour}
            onChange={handlehour}type='text' name="hour" placeholder="시 (24시간제로 입력)" className="inputdatepost" ></input>
            <input value={minute}
            onChange={handleminute} type='text' name="minute" placeholder="분" className="inputdatepost" ></input>
            </div>
            <br></br><br></br>

            <div className="comment">모집 마감일 </div>
            <div className="inputWrappost">
            <input value={endmonth}
            onChange={handleendmonth} type='text' name="month" placeholder="달" className="inputdatepost" ></input>
            <input value={endday}
            onChange={handleendday} type='text' name="day" placeholder="날짜" className="inputdatepost" ></input>
            
            </div>
            <br></br><br></br>

            <div className="comment">밥상 성별</div>
            <div className="inputWrappost">
            <select value={genderset}
            onChange={handlegenderset} id="genderset" className="inputgenderpost">
                <option selected value='혼성' >혼성</option>
                <option  value='남성' >남성</option>
                <option  value='여성'>여성</option>   
            </select> 
            </div>
            <br></br><br></br>

            <div className="comment">밥상 유형</div>
            <div className="inputWrappost">
            <select value={maxattender}
            onChange={handlemaxattender} id="maxattender" className="inputgenderpost">
                <option  value='2' >2인상</option>
                <option  value='3' >3인상</option>
                <option selected value='4' >4인상</option>   
            </select>
            </div>
            <br></br><br></br>

            <div className="comment">밥상 소개글</div>
            <div className="inputWrappost">
            <textarea value={introduction} onChange={handleintroduction} type='text' name="introduction" placeholder="밥상 소개글 입력" className="inputboxpost2" ></textarea>
            </div>
            <br></br><br></br>

            <div className='comment'>밥상 이미지 업로드</div>
            <br></br>
            <input type="file" id="file" onChange={handleChangeFile} multiple="multiple"/>    
            <br></br><br></br>
            
           
          </div>
           <br></br>
           <button disabled={notAllowpost} className="submit22" onClick={()=> Send()}>밥상 차리기</button>
           
        </div>
       


        {/*<div className="map_wrap">
           <div id="map" style={{marginLeft:'15%', width:'70%',height:'100%',position:'relative',overflow:'hidden'}}></div>

            <div id="menu_wrap" className='bg_white'>
             <div className='option'>
             <div>
                <form>
                     <input type="text"  onChange={handleresname} value={key} id='keyword' size="15"/> 
                    <button onClick={forceUpdate}type="submit">검색하기</button> 
                </form>
            </div>
        </div>
        
        <ul id="placesList"></ul>
        <div id="pagination"></div>
        </div>
    </div>*/}
        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=1c70f391fa0574a49c9fc511e871dc37&libraries=services"></script>

         
      </div>
      
    );
    }