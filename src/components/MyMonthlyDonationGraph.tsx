import { useState } from "react";
import "./css/MyMonthlyDonationGraph.css";
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { useSpring, animated } from "react-spring";
    
function MyMonthlyDonationGraph(){
  const state = useSelector((state: RootState) => state.mypageReducer);
  const { mypageInfo } = state;

  const donates = mypageInfo.mypageInfo.donates
  const yearMonthMoney: any[] = []
  const donateYears: number[] = [];
  const [currentYear, changeYear] = useState(2021);
  const [isVisible, show] = useState(0);

  const month = [1,2,3,4,5,6,7,8,9,10,11,12];

  for (let donate of donates) {
    let year = Number(donate.createdAt.slice(0,4));
    let month = Number(donate.createdAt.slice(5,7));
    let money = donate.money;
    let insert = true;
    for (let i=0; i<yearMonthMoney.length; i++) {
      if (yearMonthMoney[i].year === year && yearMonthMoney[i].month === month) {
        yearMonthMoney[i] = { ...yearMonthMoney[i], money: yearMonthMoney[i].money + money }
        insert = false;
      } 
    }
    if (insert) {
      yearMonthMoney.push({ year, month, money })
    }
  }

  for (let el of yearMonthMoney) {
    if (!donateYears.includes(el.year)) donateYears.push(el.year);
  }
  donateYears.sort();
  
  const growing = useSpring({
    from: { height: '0%' },
    to: { height: '100%' },
    config: { duration: 3000 },
    // loop: false
  });

  return (
    <div>
    
    <div id="myMonthlyDonationGraphContainer" onMouseOver={() => show(1)} onMouseOut={() => show(0)}>
      <div className="myPageTitle">{`${currentYear} 후원 그래프`}</div>
      <div className="myPageSubTitle">{`${currentYear}년 월별 후원 금액을 살펴보실 수 있습니다.`}</div>
      <div id="myMonthlyDonationGraph">
        <button id="preYear" style={{ opacity: isVisible }} onClick={() => donateYears[donateYears.indexOf(currentYear)-1] ? changeYear(donateYears[donateYears.indexOf(currentYear)-1]) : false}>{`<`}</button>
        <div id="graph">
          {
            month.map((el, i) => {
              let maxHeight = 0;
              let money = 0;
              for (let i=0; i<yearMonthMoney.length; i++) {
                if (yearMonthMoney[i].year === currentYear && yearMonthMoney[i].month === el) money = yearMonthMoney[i].money;
                if (yearMonthMoney[i].year === currentYear) {
                  if (yearMonthMoney[i].money > maxHeight) maxHeight = yearMonthMoney[i].money;
                }
              }
            return <div key={i} className="box">
              <animated.div id="aDiv" style={growing}>
              <div className="bar" style={{ height: `${money / (maxHeight * 1.2) * 100}%` }}></div>
              <div className="money" style={{ opacity: isVisible }}>{money === 0 ? '' : money.toLocaleString()}</div>
              </animated.div>
              <div className="text">{el}월</div>
            </div>})
          }
        </div>
        <button id="nextYear" style={{ opacity: isVisible }} onClick={() => donateYears[donateYears.indexOf(currentYear)+1] ? changeYear(donateYears[donateYears.indexOf(currentYear)+1]) : false}>{`>`}</button>
      </div>
    </div>
    
    </div>
  )
}

export default MyMonthlyDonationGraph;