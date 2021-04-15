import { withRouter } from "react-router";
import "./css/ContentPage.css";
import ContentNewsList from "../components/ContentNewsList"
import Footer from "../components/Footer"
import ContentMessageList from '../components/ContentMessageList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { showNewsContent } from '../action';

function ContentPage() {
  const dispatch = useDispatch();
  const [ngoInfo, setNgoInfo] = useState({data: {name: "", description: "", link: "", logo: "", ngocategorys: [], since: "", video: ""}, newsList: []});
  const state = useSelector((state: RootState) => state.contentReducer);
  const { currentNgoId } = state;

  const handleLogoClick = () => {
    window.location.href = "./guide.html"
  }
  const handleMyPageClick = () => {
    window.location.href = "./mypage"
  }

  const handleNgoLogoClick = () => {
    window.open(ngoInfo.data.link)
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/contentpage/${currentNgoId}`)
    .then((res) => {
      console.log(res.data);
      setNgoInfo(res.data);
      dispatch(showNewsContent(res.data.newsList));
    })
    .catch(err => console.log(err));
  }, [])

  return (
    <div id="contentPageContainer">
      <div id="contentHeaderPart">
        <div id="contentHeaderPartTitle">{ngoInfo.data.name}</div>
        <div id="contentHeaderImgContainer">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
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
            <button className="shadow">관심단체 추가하기</button>
            <button className="shadow">후원하기</button>
          </div>
        </div>
        <div id="contentMainBottom">
          <div id="videoAndDescription">
            <div id="contentDescription">
              <div className="contentBoxTitle">{`${ngoInfo.data.name}는?`}</div>
              <div className="contentBoxSubTitle">{`사회단체 ${ngoInfo.data.name}를 소개합니다.`}</div>
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
          <ContentNewsList ngoName={ngoInfo.data.name}/>
          <ContentMessageList />
        </div>
      </div>
    </div>
  )
}

export default withRouter(ContentPage);