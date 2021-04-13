import { withRouter } from "react-router";
import "./css/PayPage.css";
import React, { useState } from 'react';
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import PayPageModal from "../components/PayPageModal"

interface Item {
  id: number;
  title: string;
  body: number;
  color: string;
}

export interface ExampleState {
  item: Item[];
}

function PayPage() {

  const [state, setState] = useState({
    tasks:
    [
      {id: 0, title:"기아대책", body: 5000, color: "beige"}, 
      {id: 1, title:"세이브더칠드런", body: 15000, color: "beige"}, 
      {id: 2, title:"유니세프", body: 20000, color: "beige"},
    ]
  });

  const [display, setDisplay] = useState(true);

  const itemRenderer = (item:Item, index:number): JSX.Element => {
    return (
      <div className="payBoxContent shadow">
        <div className="payBoxContentImg"></div>
      <div draggable className="payBoxContentTitle" style={{background: item.color}}>
        <p>N G O : {item.title}</p>
        <div>
          {/* item.id: {item.id} - index: {index} */}
          후원금: {item.body} ₩
        </div>
      </div>
      <div className="payBoxContentDelete shadow">
        X
      </div>
      </div>
    )
  }

  const handleRLDDChange = (reorderedItems: Array<Item>) => {
    setState({ tasks: reorderedItems})
  }

  const handleClickPayBtn = () => {
    setDisplay(false);
  }

  const handleLogoClick = () => {
    window.location.href = "./guide.html"
  }
  const handleMyPageClick = () => {
    window.location.href = "./mypage"
  }
  return (
  <div id="payPageContainer">
    <div id="payNavPart">
      <div className="navLogo" onClick={handleLogoClick}>B I N G O</div>
      <div className="navMyPage shadow" onClick={handleMyPageClick}>mypage</div>
    </div>
    <div id="payListPart">
      {display ? (
        <div className="payListEntryPart shadow">
        <div className="payBoxTitle">정기후원하기</div>
        <div className="payBoxContentBox">
          <RLDD
            items ={state.tasks}
            itemRenderer={itemRenderer}
            onChange={handleRLDDChange}
          />
        </div>
        <div className="payBoxPayBtnBox">
          <div>총후원금: 40000 ₩</div>
          <button className="payBoxPayBtn">결제하기</button>
        </div>
      </div>
      ) : null}
      {display ? (
        <div className="payListEntryPart shadow">
        <div className="payBoxTitle">정기후원하기</div>
        <div className="payBoxContentBox">
          <RLDD
            items ={state.tasks}
            itemRenderer={itemRenderer}
            onChange={handleRLDDChange}
          />
        </div>
        <div className="payBoxPayBtnBox">
          <div>총후원금: 40000 ₩</div>
          <button className="payBoxPayBtn" onClick={handleClickPayBtn}>결제하기</button>
        </div>
      </div>
      ) : null}
      {display ? 
        null : 
        (<div className="payListEntryPart shadow">
        <div className="payBoxTitle">응원메세지 남기기</div>
        <div id="payBoxPostMessageBox">
          {state.tasks.map((item) => {
            return(
            <div key ={item.id} className="payPagePostMessage shadow">
              <div className="payBoxPostMessageImg"></div>
              <div>{item.title}</div>
              <input></input>
            </div>
            )
          })}
        </div>
        <div className="payBoxPayBtnBox" style={{flexDirection: "row-reverse"}}>
          <button className="payBoxPayBtn">남기기</button>
        </div>
      </div>
      )}
    </div>
  </div>
  )
}

export default withRouter(PayPage);