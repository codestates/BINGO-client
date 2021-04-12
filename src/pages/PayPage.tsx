import { withRouter } from "react-router";
import "./css/PayPage.css";
import React, { useState } from 'react';

function PayPage() {

  const tasks: any = {
    wip: [],
    complete: [],
  }

  const [state, setState] = useState({
    tasks:[
      {name:"Angular", category: "wip"}, 
      {name:"React", category: "wip"}, 
      {name:"View", category: "complete"}]
  })

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
      <div className="payListEntryPart shadow">
        <div className="payBoxTitle">정기후원하기</div>
        <div className="payBoxContentBox" >
          {/* {state.tasks.forEach((item) => {tasks[item.category].push(<div key={item.name} className="payBoxContent shadow" draggable>N G O</div>)})} */}
          <div className="payBoxContent shadow" draggable>N G O</div>
          <div className="payBoxContent shadow" draggable>N G O</div>
        </div>
        <div className="payBoxPayBtnBox">
          <button className="payBoxPayBtn">결재하기</button>
        </div>
      </div>
      <div className="payListEntryPart">
        <div className="payBoxTitle">일시후원하기</div>
        <div className="payBoxContentBox">
          <div className="payBoxContent shadow" draggable>N G O</div>
          <div className="payBoxContent shadow" draggable>N G O</div>
        </div>
        <div className="payBoxPayBtnBox">
          <button className="payBoxPayBtn">결재하기</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default withRouter(PayPage);