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
    <div id="myNavPart">
      <img src="" alt="bingo_logo" onClick={handleLogoClick}/>
      <button onClick={handlePayPageClick}>Pay Page</button>
    </div>
    <div id="myProfilePart">
      <img id="myProfilePic" src={"/images/defaultProfilePic.png"} alt="user_profilepic" />
      <div id="myProfileUserInfo">
        <span id="myProfileUsername">김빙고</span>
        <img src="" alt="user_level_badge"/>
        <button>Logout</button>
      </div>
    </div>
    <div id="myContentPart">
      <div className="myContentTitles">현재 김빙고님의 정기후원 내역</div>
      <MyRegularDonationList/>
      <div className="myContentTitles">김빙고님은 어떤 시민인가요?</div>
      <MyCitizenInfo />
      <div className="myContentTitles">김빙고님의 모든 후원 내역</div>
      <MyAllDonationGraph />
      <div className="myContentTitles">김빙고님의 월별 기부 내역</div>
      <MyMonthlyDonationGraph />
    </div>
    <Footer/>
  </div>
  )
}

export default withRouter(MyPage);