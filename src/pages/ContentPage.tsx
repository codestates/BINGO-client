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
        <div id="contentHeaderNav">
          <div id="contentNavLogo" onClick={handleLogoClick}>B I N G O</div>
          <div id="contentMyPageBtn" className="shadow" onClick={handleMyPageClick}>마이페이지</div>
        </div>
      </div>
      <div id="contentMainPart">
        <div id="contentMainTop">
          <div id="contentMainTopLogo" className="shadow"></div>
          <div id="contentMainTopRight">
            <div id="contentMainTopRightTop">
              <button className="shadow">관심단체 추가</button>
            </div>
            <div id="contentMainTopRightBottom">
              <span>동물권행동 카라</span>
              <button className="shadow">후원하기</button>
            </div>
          </div>
        </div>
        <div id="contentMainBottom">
          <div id="videoAndDescription">
            <div id="contentDescription">
            <div className="contentBoxTitle">동물권행동 카라는?</div>
            <div id="descriptionBox">
              <div className="shadow">"동물권행동 카라는 동물의 권익보호를 위해 활동하는 동물권 단체이다."</div>
              <div className="shadow">"76명의 회원이 동물권행동 카라를 후원하고 있습니다."</div>
              <div className="shadow">"동물권행동 카라는 1999년 김코딩이 설립한 시민단체입니다."</div>
            </div>
            </div>
            <div id="contentVideo">
            <div className="contentBoxTitle">동물권행동 카라의 Video</div>
            <iframe src="https://www.youtube.com/watch?v=Iq6iima8ENU" title="NGO_video"></iframe></div>
          </div>
          <ContentMessageList />
          <ContentNewsList />
        </div>
      </div>
    </div>
  )
}

export default withRouter(ContentPage);