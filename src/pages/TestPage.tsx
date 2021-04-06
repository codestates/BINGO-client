import { withRouter } from "react-router";
import "./css/TestPage.css";

function TestPage() {
  return (<div className="testPageContainer">
    <div className="testNavPart">
      <img className="testNavLogo" src="" alt="bingo_logo"/>
    </div>
    <div className="testMainPart">
      <div className="testMainNumber">1/10</div>
      <div className="testMainQuestion">Q1. 나는 길고양이나 유기견을 보면 마음이 아프다</div>
      <div className="testMainBtnBox">
        <button className="testMainYesBtn">Yes</button>
        <button className="testMainNoBtn">No</button>
      </div>
    </div>
    <div className="testExtraPart">
      <div className="testExtraDescription">위 열 가지 질문에 답해주시면, BINGO가 당신의 후원유형을 분석해드립니다</div>
      <button className="testExtraSubmitBtn">submit</button>
    </div>
    <button className="testSkipBtn">Skip</button>
  </div>)
}

export default withRouter(TestPage);