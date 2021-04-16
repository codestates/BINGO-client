import { withRouter } from "react-router";
import "./css/ContentPage.css";
import ContentNewsList from "../components/ContentNewsList"
import Footer from "../components/Footer"
import ContentMessageList from '../components/ContentMessageList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { showcontentModal, showNewsContent, showMessageContent } from '../action';
import { Motion, spring } from 'react-motion';
import ContentPageModal from "../components/ContentPageModal"

const bannerImages = {
  아동: "https://t1.daumcdn.net/cfile/tistory/996F99455EF3FBA61F",
  장애인: "https://t1.daumcdn.net/cfile/tistory/996F99455EF3FBA61F",
  여성: "https://t1.daumcdn.net/cfile/tistory/996F99455EF3FBA61F",
  성소수자: "https://chingusai.net/xe/files/attach/images/296431/450/544/bdf2df8fbfc1794c371dd4cf17c95dc0.jpg",
  동물: "https://blog.kakaocdn.net/dn/czHiGp/btqDJfS6avh/U65P3U5Jt370Dme1h8pz01/img.jpg",
  환경: "https://dt40dm21pj8em.cloudfront.net/uploads/froala/file/5336/%ED%99%98%EA%B2%BD%20%EA%B3%B5%EA%B8%B0%EC%97%85%201.jpg",
  노인: "https://cdn.thescoop.co.kr/news/photo/202010/41232_58111_3824.jpg",
  청소년: "https://t1.daumcdn.net/cfile/tistory/996F99455EF3FBA61F",
  보건: "http://pds.medicaltimes.com/NewsPhoto/202001/1131536_1.jpg",
  가족: "https://blog.kakaocdn.net/dn/bBuB2L/btqBMObb4Ld/ygEHaSVBofOC2c7zHnzNnK/img.jpg",
  다문화: "https://cdn.epnc.co.kr/news/photo/202006/97811_90478_3248.jpg",
  기타: "https://t1.daumcdn.net/cfile/tistory/996F99455EF3FBA61F",
  지구촌: "https://t1.daumcdn.net/cfile/tistory/996F99455EF3FBA61F",
  결연: "https://t1.daumcdn.net/cfile/tistory/996F99455EF3FBA61F",
  회원: "https://t1.daumcdn.net/cfile/tistory/996F99455EF3FBA61F",
  참여: "https://t1.daumcdn.net/cfile/tistory/996F99455EF3FBA61F",
  스토어: "https://t1.daumcdn.net/cfile/tistory/996F99455EF3FBA61F",
  종교: "https://t1.daumcdn.net/cfile/tistory/996F99455EF3FBA61F",
}

function ContentPage() {
  const dispatch = useDispatch();
  const [ngoInfo, setNgoInfo] = useState({data: {name: "", description: "", link: "", logo: "", ngocategorys: [], since: "", video: ""}, newsList: []});
  const [isAlreadyLove, setIsAlreadyLove] = useState(false);
  const [filteredBannerImages, setFilteredBannerImages] = useState(["https://chingusai.net/xe/files/attach/images/296431/450/544/bdf2df8fbfc1794c371dd4cf17c95dc0.jpg", "https://chingusai.net/xe/files/attach/images/296431/450/544/bdf2df8fbfc1794c371dd4cf17c95dc0.jpg", "https://chingusai.net/xe/files/attach/images/296431/450/544/bdf2df8fbfc1794c371dd4cf17c95dc0.jpg", "https://chingusai.net/xe/files/attach/images/296431/450/544/bdf2df8fbfc1794c371dd4cf17c95dc0.jpg"])
  const state = useSelector((state: RootState) => state.contentReducer);
  const { currentNgoId, userInfo } = state;
  const [top, setTop] = useState(150);
  const [opacity, setOpacity] = useState(0);

  const handleLogoClick = () => {
    window.location.href = "./guide.html"
  }
  const handleMyPageClick = () => {
    window.location.href = "./mypage"
  }
  const handleNgoLogoClick = () => {
    window.open(ngoInfo.data.link)
  }
  const checkLove = () => {
    if(userInfo.ngoIdOfLoveList.indexOf(currentNgoId) >= 0){
      setIsAlreadyLove(true);
    }
  }
  const handleLoveClick =() => {
    if(isAlreadyLove){
      setIsAlreadyLove(false);
      axios.delete("http://localhost:5000/like", {data: {
        ngoId: currentNgoId,
        userId: userInfo.id
      }})
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    } else if (!isAlreadyLove){
      setIsAlreadyLove(true);
      axios.post("http://localhost:5000/like", {data: {
        ngoId: currentNgoId,
        userId: userInfo.id
      }})
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    }
  }
  const pickImages = (categoryArr) => {
    let ImageArr = ["test"];
    for(let i = 0; i < 3; i++){
      let categoryName: string = categoryArr[i].category.name
      ImageArr.push(bannerImages[categoryName])
    }
    console.log(ImageArr);
    setFilteredBannerImages(ImageArr);
  }

  const handleSupportBtn = () => {
    dispatch(showcontentModal(true));
  }

  useEffect(() => {
    setTop(0);
    setOpacity(1);
    checkLove();
    
    axios.get(`http://localhost:5000/contentpage/${currentNgoId}`)
    .then((res) => {
      console.log(res.data);
      setNgoInfo(res.data);
      dispatch(showNewsContent(res.data.newsList));
      dispatch(showMessageContent(res.data.messageList));
      return res.data.data.ngocategorys
    })
    .then(res => {
      pickImages(res);
    })
    .catch(err => console.log(err));
    }, [])

  return (
    <div id="contentPageContainer">
      <ContentPageModal ngoName={ngoInfo.data.name} />
      <div id="contentHeaderPart">
        <div id="contentHeaderPartTitle">{ngoInfo.data.name}</div>
        <div id="contentHeaderImgContainer">
          <ul>
            <li style={{backgroundImage: `url(${filteredBannerImages[1]})`}}></li>
            <li style={{backgroundImage: `url(${filteredBannerImages[2]})`}}></li>
            <li style={{backgroundImage: `url(${filteredBannerImages[3]})`}}></li>
          </ul>
        </div>
        <div id="contentHeaderNav">
          <div id="contentNavLogo" onClick={handleLogoClick}>B I N G O</div>
          <div id="contentMyPageBtn" className="shadow" onClick={handleMyPageClick}>마이페이지</div>
        </div>
      </div>
      <div id="contentMainPart">
        <div id="contentMainTop">
          <div id="contentMainTopLogo" className="shadow" style={{backgroundImage: `url(${ngoInfo.data.logo})`}} onClick={handleNgoLogoClick}></div>
          <div id="contentMainTopRight">
            <button className="shadow" onClick={handleLoveClick}>{isAlreadyLove ? "관심단체 추가됨" : "관심단체 추가하기"}</button>
            <button className="shadow" onClick={() => {
              console.log(ngoInfo.data.ngocategorys)
              pickImages(ngoInfo.data.ngocategorys)
              handleSupportBtn()
              }}>후원하기</button>
          </div>
        </div>
        
        <div id="contentMainBottom" >
        <Motion style={{ top: spring(top), opacity: spring(opacity) }}>
        {
          ({ top, opacity }) => 
          <div id="videoAndDescription" style={Object.assign({}, {  }, { top, opacity } )}>
            <div id="contentDescription">
              <div className="contentBoxTitle">{`${ngoInfo.data.name}?`}</div>
              <div className="contentBoxSubTitle">{`사회단체 ${ngoInfo.data.name}을(를) 소개합니다.`}</div>
              <div id="descriptionBox" className="shadow">
                {ngoInfo.data.description}
              </div>
            </div>
            <div id="contentVideo">
              <div className="contentBoxTitle">{`${ngoInfo.data.name}의 비디오`}</div>
              <div className="contentBoxSubTitle">영상의 타이틀을 클릭하면 유튜브로 이동하실 수 있습니다.</div>
              <iframe id="videoBox" className="shadow" src={ngoInfo.data.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
          }
          </Motion>
          <ContentNewsList ngoName={ngoInfo.data.name}/>
          <ContentMessageList ngoName={ngoInfo.data.name}/>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default withRouter(ContentPage);