import { useState } from "react";
import { withRouter } from "react-router";
import Footer from "../components/Footer"
import "./css/TestPage.css";

function TestPage() {
  const [question, setQuestion] = useState('Q1. 나는 길고양이나 유기견을 보면 마음이 아프다');
  const [count, setCount] = useState(1);

  const handleClickBtn = () => {
    setCount(count + 1);
    switch(count){
      case 1: 
        setQuestion('Q2. 나는 노인들을 보면 마음이 아프다');
        break;
      case 2:
        setQuestion('Q3. 나는 플라스틱 분리수거를 하지 않으면 마음이 아프다');
        break;
      case 3:
        setQuestion('Q4. 나는 플라스틱 분리수거를 하지 않으면 마음이 아프다');
    }
  }

  const handleSkipBtnClick = () => {
    window.location.href = "./list"
  }
  const handleLogoClick = () => {
    window.location.href = "./guide.html"
  }

  return (<div id="testPageContainer">
    <div id="testNavPart">
      <div id="testNavLogo" onClick={handleLogoClick}>B I N G O</div>
      <div id="testSkipBtn" className="shadow" onClick={handleSkipBtnClick}>넘어가기</div>
    </div>
    <div id="testMainPart" className="shadow">
      <div id="testMainNumber">1/10</div>
      <div id="testMainQuestion">{question}</div>
      <div id="testMainBtnBox">
        <button id="testMainYesBtn" className="shadow" onClick={handleClickBtn}>네</button>
        <button id="testMainNoBtn" className="shadow" onClick={handleClickBtn}>아니오</button>
      </div>
    </div>
    <div id="testExtraPart">
      <div id="testExtraDescription">위 열 가지 질문에 답해주시면, BINGO가 당신의 후원유형을 분석해드립니다</div>
      <button id="testExtraSubmitBtn" className="shadow">제출하기</button>
    </div>
    <Footer />
  </div>)
}

export default withRouter(TestPage);