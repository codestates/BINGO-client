import { withRouter } from "react-router";
import "./css/PayPage.css";

function PayPage() {
  const handleLogoClick = () => {
    window.location.href = "./guide.html"
  }
  const handleMyPageClick = () => {
    window.location.href = "./mypage"
  }
  return (
  <div className="payPageContainer">
    <div id="payNavPart">
      <img className="testNavLogo" src="" alt="bingo_logo" onClick={handleLogoClick}/>
      <div onClick={handleMyPageClick}>mypage</div>
    </div>
    <div id="payListPart">
      <div className="payListEntryPart">
        <div className="payBoxTitle">정기후원하기</div>
        <div className="payBoxContentBox">
          <div className="payBoxContent">N G O</div>
          <div className="payBoxContent">N G O</div>
        </div>
        <div className="payBoxPayBtnBox">
          <button className="payBoxPayBtn">결제하기</button>
        </div>
      </div>
      <div className="payListEntryPart">
        <div className="payBoxTitle">일시후원하기</div>
        <div className="payBoxContentBox">
          <div className="payBoxContent">N G O</div>
          <div className="payBoxContent">N G O</div>
        </div>
        <div className="payBoxPayBtnBox">
          <button className="payBoxPayBtn">결제하기</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default withRouter(PayPage);