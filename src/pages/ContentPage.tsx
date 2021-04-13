import { withRouter } from "react-router";
import "./css/ContentPage.css";
import ContentNewsList from "../components/ContentNewsList"
import Footer from "../components/Footer"
import ContentMessageList from '../components/ContentMessageList';

function ContentPage() {
  const handleLogoClick = () => {
    window.location.href = "./guide.html"
  }
  const handleMyPageClick = () => {
    window.location.href = "./mypage"
  }

  return (
    <div id="contentPageContainer">
      <div id="contentHeaderPart">
        <div id="contentHeaderPartTitle">동물권행동 카라</div>
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
          <div id="contentMainTopLogo" className="shadow"></div>
          <div id="contentMainTopRight">
            <button className="shadow">관심단체 추가</button>
            <button className="shadow">후원하기</button>
          </div>
        </div>
        <div id="contentMainBottom">
          <div id="videoAndDescription">
            <div id="contentDescription">
              <div className="contentBoxTitle">동물권행동 카라는?</div>
              <div className="contentBoxSubTitle">사회단체 동물권행동 카라를 소개합니다.</div>
              <div id="descriptionBox" className="shadow">
                "아수나로는 모든 청소년이 인권을 보장받는 사회를 만들기 위해 
                청소년들이 중심이 되어 직접 행동을 통해 잘못된 것을 바꿔나가는 민간 사회단체입니다."
              </div>
            </div>
            <div id="contentVideo">
              <div className="contentBoxTitle">동물권행동 카라의 Video</div>
              <div className="contentBoxSubTitle">영상의 타이틀을 클릭하면 유튜브로 이동하실 수 있습니다.</div>
              <iframe id="videoBox" className="shadow" src="https://www.youtube.com/embed/juEggCpbFXA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            </div>
          <ContentNewsList />
          <ContentMessageList />
        </div>
      </div>
    </div>
  )
}

export default withRouter(ContentPage);