import { withRouter } from "react-router";
import Footer from "../components/Footer"
import "./css/TestPage.css";
import {Motion, spring} from 'react-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { animateCard, pushOption, changeOptionColor, changeTestValue } from '../action';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function TestPage(props: any) {
  const text1 = ['당신은', '당신은'];
  const text2 = ['먼 곳보다 가까운 이웃들에게 도움을 주는 것에 더 관심이 있고', '지구 전역의 불우한 이웃들에게 관심이 많고'];
  const text3 = ['특정 소수보다는 다수가 골고루 혜택을 받는 것을 선호하며,', '한 사람과 좀 더 깊은 관계를 가지는 것을 선호하며,'];
  const text4 = ['모임이나 단체에 가입하여 참여하는 것에 부담을 느낄 수 있습니다.', '어딘가에 소속되어 일하는 것에서 즐거움을 느낄 수 있습니다.'];
  const text5 = ['또,', '또, 일회성으로 후원하는 것보다 직접 시간과 마음을 쏟으며 남을 돕는 일에 보람을 느끼고'];
  const text6 = ['사회적 가치가 담긴 제품에 별 관심이 없으며', '같은 제품이라도 사회적 가치가 담겨있는 제품을 더 선호하는 성향이 있으며'];
  const text7 = ['후원과 종교는 별 관련이 없다고 생각합니다.', '종교는 더 나은 사회를 만든다고 믿습니다.'];
  const text8 = ['그리고 규모와 전통이 있어 좀 더 대중적이며 믿을 수 있는 후원단체를 선호합니다.', '그리고 새로운 방식의 기부나, 새로 생겨나는 후원단체에 관심이 있습니다.'];

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.testReducer);
  const { testList, selectedOptions, optionList } = state;
  const [toast, setOn] = useState({ message: '', visible: 'none' });
  const [resultVisible, showResult] = useState(0);
  const [result, getResult] = useState({logo: '', name: '', description: ''})
  let postOrder = false;

  const getText = () => {
    return `${text1[testList[0].value]} ${text2[testList[1].value]} ${text3[testList[2].value]} ${text4[testList[3].value]} 
    ${text5[testList[4].value]} ${text6[testList[5].value]} ${text7[testList[6].value]} ${text8[testList[7].value]}`;
  }

  const getTestPage = () => {
    const plusoneIndex = selectedOptions.map((el: number) => el+1);
    let postOptions: number[] = [];
    for (let test of testList) {
      if (test.value === 1) {
        postOptions.push(testList.indexOf(test));
      }
    }
    postOptions = postOptions.map((el: number) => el+12);
    axios.get('http://localhost:5000/testpage', {
      withCredentials: true,
      params: {
        options: {
          selectedOptions: plusoneIndex,
          postOptions,
          postOrder,
        }
      }
    })
    .then(res => {
      getResult(res.data)
      showResult(1);
    })
    .catch(err => console.log(err))
  }

  const animate = (index: number) => {
    dispatch(animateCard(index));
    if (index === 7) {
      getTestPage();
    }
  }

  const activeToast = (message: string) => {
    setOn({ message, visible: 'inline' });
    setTimeout(() => {
      setOn({ message: '', visible: 'none' });
    }, 2000)
  }

  const handleOptionBtnClick = (index:number) => {
    let count = 0;
    for (let option of optionList) {
      if (option.color !== 'white') count++;
    }
    if (optionList[index].color === 'white') {
      if (count < 3) {
        dispatch(changeOptionColor(index, 'rgb(245, 154, 125)'))
      } else {
        activeToast('3개까지만 선택해 주세요!')
      }
    } else {
      dispatch(changeOptionColor(index, 'white'))
    }
  }

  const handleNextBtn = () => {
    let count = 0;
    for (let option of optionList) {
      if (option.color !== 'white') count++;
    }
    if (count <= 0) {
      activeToast('선택한 이슈가 없어요!')
      return;
    }
    for (let i=0; i<optionList.length; i++) {
      if (optionList[i].color !== 'white') selectedOptions.push(i);
    }
    saveOption(selectedOptions);
    animate(0)
  }

  const saveOption = (selectedOptions: Array<number>) => {
    dispatch(pushOption(selectedOptions));
  }

  const yesBtn = (index: number) => {
    testList[index].value === 0 ? dispatch(changeTestValue(index, 1)) : dispatch(changeTestValue(index, 0))
    if (index === 7) postOrder = true;
    animate(index);
  }

  const noBtn = (index: number) => {
    animate(index);
  }

  const handleSkipBtnClick = () => {
    props.history.push('/list')
  }
  const handleLogoClick = () => {
    window.location.href = "./guide.html"
  }

  return (
    <div id="testPageContainer">
      <div id="testNavPart">
        <div id="testNavLogo" onClick={handleLogoClick}>B I N G O</div>
        <div id="testSkipBtn" className="shadow" onClick={handleSkipBtnClick}>건너뛰기</div>
      </div>
      <div id="resultPart" style={ { opacity: resultVisible } }>
        <div id="textPart">
          <div id='textPartTitle'>나의 후원성향</div>
          <div id='textResult'>{getText()}</div>
          <div id='cardResult'>
          {
            selectedOptions.map((el: number, i: number) => <span key={i} id="selectedCard">{optionList[el].name}</span>)
          } 
          </div>
        </div>
        <div id="ngoPart">
        <div id='ngoPartTitle'>추천 후원단체</div>
          <div id="imageDiv">
          <img id='ngoImage' alt="NgoLogo" src={result.logo}></img>
          </div>
          <div id='ngoName'>{result.name}</div>
          <div id='ngoDescription'>{result.description}</div>
        </div>
      </div>
      {
        testList.map((test, i) => {
          if(i === 0) {
            return <Motion key={i} style={{ left: spring(test.left), opacity: spring(test.opacity) }}>
            {
              ({ left, opacity }) => 
            <div id="testMainPart1" className="shadow" style={Object.assign({}, { zIndex: 101 }, { left: `${left}%`, opacity } )}>
              <div id="testMainNumber">{`${i+1}/8`}</div>
              <div id="testMainQuestion">{test.question}</div>
              <div id="testOptions">
              {
                optionList.map((option, i) => 
                  <button key={i} id ="optionBtn" onClick={() => handleOptionBtnClick(i)} style={ { backgroundColor: option.color } }>{option.name}</button>)
              }
              </div>
              <div id="testMainBtnBox">
              <button id="testMainNextBtn" onClick={() => handleNextBtn()}>다음</button>
              </div>
            </div>
            }
          </Motion>
          } else {
            return <Motion key={i} style={{ left: spring(test.left), opacity: spring(test.opacity) }}>
            {
              ({ left, opacity }) => 
            <div id="testMainPart" style={Object.assign({}, { zIndex: 100-i }, { left: `${left}%`, opacity } )}>
              <div id="testMainNumber">{`${i+1}/8`}</div>
              <div id="testMainQuestion">{test.question}</div>
              <div id="testMainBtnBox">
                <button id="testMainYesBtn" onClick={() => yesBtn(i)}>네</button>
                <button id="testMainNoBtn" onClick={() => noBtn(i)}>아니오</button>
              </div>
            </div>
            }
            </Motion>
          }
        }
        )
      }
      <div id="toastMessage" style={ { display: toast.visible, zIndex: 200 } }>{toast.message}</div>
      <div id="testExtraPart">
        {/* <div id="testExtraDescription">위 열 가지 질문에 답해주시면, BINGO가 당신의 후원유형을 분석해드립니다</div> */}
        <Link to="/list" style={ { opacity: resultVisible } }>
        <button id="testExtraSubmitBtn">더 많은 단체 보러가기</button>
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default withRouter(TestPage);