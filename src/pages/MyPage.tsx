import { withRouter } from "react-router";
import "./css/MyPage.css";
import MyRegularDonationList from "../components/MyRegularDonationList"
import MyCitizenInfo from "../components/MyCitizenInfo"
import MyAllDonationGraph from "../components/MyAllDonationGraph"
import MyMonthlyDonationGraph from "../components/MyMonthlyDonationGraph"
import Footer from "../components/Footer"

function MyPage() {

  const handleLogoClick = () => {
    window.location.href = "./guide.html"
  }
  const handlePayPageClick = () => {
    window.location.href = "./pay"
  }
  return (
  <div id="myPageContainer">
      <div id="myPageNavPart">
        <div id="myPageNavLogo" onClick={handleLogoClick}>B I N G O</div>
          <div>
            <div id="myPagePayPageBtn" className="shadow" onClick={handlePayPageClick}>페이페이지</div>
            <div id="myPageLogoutBtn" className="shadow" onClick={handlePayPageClick}>로그아웃</div>
          </div>
      </div>
    <div id="myPageCoverPart">
    </div>
    <div id="myPageMainPart">
      <div id="myPageUserInfo">
        <div id="myPageProfilePic" className="shadow"></div>
        <div id="myPageUsername">JH Choi</div>
        <div>Level 3</div>
      </div>
      <div id="myPageMainContent">
        <MyRegularDonationList />
        <div id="myPageMainContentMiddle">
          <MyCitizenInfo />
          <MyAllDonationGraph />
        </div>
        <MyMonthlyDonationGraph />
      </div>
    </div>
  </div>
  )
}

export default withRouter(MyPage);