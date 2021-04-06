import { withRouter } from "react-router";
import "./css/ContentPage.css";
import ContentNewsList from "../components/ContentNewsList"
import Footer from "../components/Footer"

function ContentPage() {
  return (
  <div id="contentPageContainer">
    <div id="contentNavPart">
      <img src="" alt="bingo_logo" />
      <button>My Page</button>
    </div>
    <div id="contentBannerPart">
      <img id="contentMainBanner" src="" alt="main_banner"/>
      <button>✨ 관심단체 추가 ✨</button>
    </div>
    <div id="contentNGOInfoPart">
      <img id="contentNGOLogo" src="" alt="ngo_logo"/>
      <div id="contentNGOInfo">
        <span>동물권행동 카라</span>
        <button>후원하기</button>
      </div>
    </div>
    <div id="contentContentPart">
      <div id="contentMainContent">
        <video src="" />
        <div className="contentNGODescription">동물권행동 카라는 동물의 권익을 보호하기 위해 활동하는 동물권 단체이다</div>
        <div className="contentNGODescription">76명의 BINGO회원이 동물권행동 카라를 후원하고 있습니다.</div>
        <div className="contentNGODescription">동물권행동 카라는 1999년 김코딩이 설립한 시민단체입니다.</div>
      </div>
      <div id="contentSideNews">
        <span>동물권행동 카라 관련 소식</span>
        <ContentNewsList />
      </div>
    </div>
    <Footer/>
  </div>
  )
}

export default withRouter(ContentPage);