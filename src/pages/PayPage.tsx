import { withRouter } from "react-router";
import "./css/PayPage.css";
import React, { useState } from 'react';
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
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

  const [data, setData] = useState({
    tasks:
    [
      {id: 0, title:"기아대책", body: 5000, color: "beige", type:"one"}, 
      {id: 1, title:"세이브더칠드런.............", body: 15000, color: "beige", type:"subscribe"}, 
      {id: 2, title:"유니세프", body: 20000, color: "beige", type:"subscribe"},
    ]
  });

  const [data2, setData2] = useState({
    tasks:
    [
      {id: 0, title:"옥스팜", body: 5000, color: "beige", type:"one"}, 
      {id: 1, title:"굿네이버스", body: 15000, color: "beige", type:"subscribe"}, 
      {id: 2, title:"함께하는사랑밭", body: 20000, color: "beige", type:"subscribe"},
    ]
  })

  let left: string;
  const [top, setTop] = useState(0);

  const handleMouseDown = (id:number, e: any) => {
    console.log(document.querySelectorAll(".payBoxContent")[id]);
    const box = document.querySelectorAll(".payBoxContent")[id];
    console.log(e.pageX, e.pageY);
    setTop(e.pageY); //클릭했을때 위치

    // let shiftX = e.clientX - box.getBoundingClientRect().left;
    // let shiftY = e.clientY - box.getBoundingClientRect().top;
    // moveAt(e.pageX, e.pageY);
  }

  const handleMouseUp = (e: any) => {
    // console.log(document.querySelectorAll(".payBoxContent")[id]);
    const box = document.querySelector("#payListPart");
    console.log(e.pageX, e.pageY);
    console.log(box?.clientWidth, box?.clientHeight);
    if(e.pageY > 660 && top < 660) { // 일시후원에서 마우스를 땔때
      setData2({
        tasks:
        [
          {id: 0, title:"옥스팜", body: 5000, color: "beige", type:"one"}, 
          {id: 1, title:"굿네이버스", body: 15000, color: "beige", type:"subscribe"}, 
          {id: 2, title:"함께하는사랑밭", body: 20000, color: "beige", type:"subscribe"},
          {id: 3, title:"함께하는사랑밭", body: 20000, color: "beige", type:"subscribe"},
        ]
      })
    } else if(e.pageY < 660 && top > 660){ //정기후원에서 마우스를 땔때
      setData({
        tasks:
        [
          {id: 0, title:"기아대책", body: 5000, color: "beige", type:"one"}, 
          {id: 1, title:"세이브더칠드런.............", body: 15000, color: "beige", type:"subscribe"}, 
          {id: 2, title:"유니세프", body: 20000, color: "beige", type:"subscribe"},
          {id: 3, title:"함께하는사랑밭", body: 20000, color: "beige", type:"subscribe"},
        ]
      })
    }
  }

  const itemRenderer = (item:Item, index:number): JSX.Element => {
    return (
      <div className="payBoxContent shadow" onMouseDown={(e)=>handleMouseDown(index, e)} onMouseUp={(e)=>handleMouseUp(e)} style={{left: left, top: top}}>
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
    setData({ tasks: reorderedItems})
  }

  const handleRLDDChange2 = (reorderedItems: Array<Item>) => {
    setData2({ tasks: reorderedItems})
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
  <div id="payPageContainer">
    <PayPageModal />
    <div id="payNavPart">
      <div className="navLogo" onClick={handleLogoClick}>B I N G O</div>
      <div className="navMyPage shadow" onClick={handleMyPageClick}>mypage</div>
    </div>
    <div id="payListPart">
      {state.payMessageInfo.messageDisplay ? (
        <div className="payListEntryPart shadow">
        <div className="payBoxTitle">정기후원하기</div>
        <div className="payBoxContentBox">
          <RLDD
            items ={data.tasks}
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
      {state.payMessageInfo.messageDisplay ? (
        <div className="payListEntryPart shadow">
        <div className="payBoxTitle">일시후원하기</div>
        <div className="payBoxContentBox">
          <RLDD
            items ={data2.tasks}
            itemRenderer={itemRenderer}
            onChange={handleRLDDChange2}
          />
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
          {data.tasks.map((item) => {
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