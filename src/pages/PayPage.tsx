import { withRouter } from "react-router";
import "./css/PayPage.css";
import React, { useState } from 'react';
import PayPageModal from "../components/PayPageModal"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { showPayModal } from "../action"

interface Item {
  id: number;
  title: string;
  body: number;
  color: string;
  type: string;
}

export interface ExampleState {
  item: Item[];
}

function PayPage() {
  const state = useSelector((state: RootState) => state.payReducer);
  const dispatch = useDispatch();

  const [data, setData] = useState(
    [
      {id: 0, title:"기아대책", body: 5000, color: "beige", type:"one"}, 
      {id: 1, title:"세이브더칠드런.............", body: 15000, color: "beige", type:"subscribe"}, 
      {id: 2, title:"유니세프", body: 20000, color: "beige", type:"subscribe"},
    ]
  );
  const [repeatData, setrepeatData] = useState(
    [
      {id: 3, title:"원래 정기데이터1", body: 5000, color: "beige", type:"one"}, 
      {id: 4, title:"원래 정기데이터2", body: 15000, color: "beige", type:"subscribe"}, 
      {id: 5, title:"원래 정기데이터3", body: 20000, color: "beige", type:"subscribe"},
    ]
  );
  const [currentItem, setCurrentItem] = useState(-1);

  const onDragOver = (event: any) => {
    event.preventDefault()
  }

  const drop = (event: any, type: string) => {
    if (currentItem !== -1) {
      if (type === 'once') {
        const dataList = data.map(el => el.id);
        if (dataList.includes(currentItem)) return;
        setrepeatData(repeatData.filter(el => el.id !== currentItem))
        const ingTask = repeatData.filter(el => el.id === currentItem)
        setData([...data, ingTask[0]])
      } else {
        const dataList = repeatData.map(el => el.id);
        if (dataList.includes(currentItem)) return;
        setData(data.filter(el => el.id !== currentItem))
        const ingTask = data.filter(el => el.id === currentItem)
        setrepeatData([...repeatData, ingTask[0]])
      }
    }
    event.preventDefault();
  }

  const itemRenderer = (item: any) => {
    return (
      <div className="payBoxContent shadow" draggable="true" onDrag={()=>setCurrentItem(item.id)}>
        <div className="payBoxContentImg"></div>
      <div className="payBoxContentTitle" style={{background: item.color}}>
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

  const handleClickPayBtn = () => {
    dispatch(showPayModal(true));
  }

  const handleLogoClick = () => {
    window.location.href = "./guide.html"
  }
  const handleMyPageClick = () => {
    window.location.href = "./mypage"
  }
  return (
  <div id="payPageContainer" onMouseUp={()=>setCurrentItem(-1)}>
    <PayPageModal />
    <div id="payNavPart">
      <div className="navLogo" onClick={handleLogoClick}>B I N G O</div>
      <div className="navMyPage shadow" onClick={handleMyPageClick}>mypage</div>
    </div>
    <div id="payListPart">
      {state.payMessageInfo.messageDisplay ? (
        <div className="payListEntryPart shadow" onDragOver={(event) => onDragOver(event)} onDrop={(event) => drop(event, 'repeat')}>
        <div className="payBoxTitle">정기후원하기</div>
        <div className="payBoxContentBox">
          {
            repeatData.map(el => itemRenderer(el))
          }
        </div>
        <div className="payBoxPayBtnBox">
          <div>총후원금: 40000 ₩</div>
          <button className="payBoxPayBtn" onClick={handleClickPayBtn}>결제하기</button>
        </div>
      </div>
      ) : null}
      {state.payMessageInfo.messageDisplay ? (
        <div className="payListEntryPart shadow" onDragOver={(event) => onDragOver(event)} onDrop={(event) => drop(event, 'once')}>
        <div className="payBoxTitle">일시후원하기</div>
        <div className="payBoxContentBox">
          {
            data.map(el => itemRenderer(el))
          }
        </div>
        <div className="payBoxPayBtnBox">
          <div>총후원금: 40000 ₩</div>
          <button className="payBoxPayBtn" onClick={handleClickPayBtn}>결제하기</button>
        </div>
      </div>
      ) : null}
      {state.payMessageInfo.messageDisplay ? 
        null : 
        (<div className="payListEntryPart shadow">
        <div className="payBoxTitle">응원메세지</div>
        <div id="payBoxSubTitle">각 단체의 힘이 되는 따뜻한 말을 남겨주세요</div>
        <div id="payBoxPostMessageBox">
          {data.map((item) => {
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