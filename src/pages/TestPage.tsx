import { withRouter } from "react-router";
import Footer from "../components/Footer"
import "./css/TestPage.css";
import {Motion, spring} from 'react-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { animateCard, pushOption, changeOptionColor } from '../action';


function TestPage() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.testReducer);
  const { testList, selectedOptions, optionList } = state;
  
  const handleClickBtn = (index: number) => {
    dispatch(animateCard(index));
  }

  const handleOptionBtnClick = (index:number) => {
    let count = 0;
    for (let option of optionList) {
      if (option.color !== 'white') count++;
    }
    if (count > 2) {
      return;
    }
    optionList[index].color === 'white' ? dispatch(changeOptionColor(index, 'rgb(245, 154, 125)')) : dispatch(changeOptionColor(index, 'white'))
  }

  const handleNextBtn = () => {
    for (let i=0; i<optionList.length; i++) {
      if (optionList[i].color !== 'white') selectedOptions.push(i);
    }
    saveOption(selectedOptions);
  }

  const saveOption = (selectedOptions: Array<number>) => {
    dispatch(pushOption(selectedOptions));
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

    <Motion style={{ left: spring(testList[0].left), opacity: spring(testList[0].opacity) }}>
          {
            ({ left, opacity }) => 
          <div id="testMainPart" className="shadow" style={Object.assign({}, { zIndex: 101, top: `47%` }, { left: `${left}%`, opacity } )}>
            <div id="testMainNumber">{`1/10`}</div>
            <div id="testMainQuestion">다음 중 관심있는 사회 이슈를 골라주세요 (최대 3개 항목 선택 가능)</div>
            <div id="testOptions">
            {
              optionList.map((option, i) => 
                <button id ="optionBtn" onClick={() => handleOptionBtnClick(i)} style={ { backgroundColor: option.color } }>{option.name}</button>)
            }
            </div>
            <div id="testMainBtnBox">
            <button id="testMainYesBtn" onClick={() => handleNextBtn()}>다음</button>
            </div>
          </div>
          }
    </Motion>
    
    {
      testList.map((test, i) => 
        <Motion key={i} style={{ left: spring(test.left), opacity: spring(test.opacity) }}>
          {
            ({ left, opacity }) => 
          <div id="testMainPart" style={Object.assign({}, { zIndex: 100-i }, { left: `${left}%`, opacity } )}>
            <div id="testMainNumber">{`${i+1}/10`}</div>
            <div id="testMainQuestion">{test.question}</div>
            <div id="testMainBtnBox">
              <button id="testMainYesBtn" onClick={() => handleClickBtn(i)}>네</button>
              <button id="testMainNoBtn" onClick={() => handleClickBtn(i)}>아니오</button>
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