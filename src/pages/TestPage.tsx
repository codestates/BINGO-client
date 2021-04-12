import { useState } from "react";
import { withRouter } from "react-router";
import Footer from "../components/Footer"
import "./css/TestPage.css";
import {Motion, spring} from 'react-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { animateCard } from '../action';


function TestPage() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.testReducer);
  const { testList } = state;
  
  const handleClickBtn = (index: number) => {
    dispatch(animateCard(index))
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
      <div id="testSkipBtn" className="shadow" onClick={handleSkipBtnClick}>건너뛰기</div>
    </div>
    
    {
      testList.map((test, i) => 
        <Motion key={i} style={{ left: spring(test.left), opacity: spring(test.opacity) }}>
          {
            ({ left, opacity }) => 
          <div id="testMainPart" className="shadow" style={Object.assign({}, { zIndex: 100-i }, { left: `${left}%`, opacity } )}>
            <div id="testMainNumber">{`${i+1}/10`}</div>
            <div id="testMainQuestion">{test.question}</div>
            <div id="testMainBtnBox">
              <button id="testMainYesBtn" className="shadow" onClick={() => handleClickBtn(i)}>네</button>
              <button id="testMainNoBtn" className="shadow" onClick={() => handleClickBtn(i)}>아니오</button>
            </div>
          </div>
          }
        </Motion>
      )
    }
    
    <div id="testExtraPart">
      {/* <div id="testExtraDescription">위 열 가지 질문에 답해주시면, BINGO가 당신의 후원유형을 분석해드립니다</div> */}
      <button id="testExtraSubmitBtn" className="shadow">결과확인</button>
    </div>
    <Footer />
  </div>)
}

export default withRouter(TestPage);