import { withRouter } from "react-router";
import "./css/PayPage.css";
import React, { useEffect, useState } from 'react';
import PayPageModal from "../components/PayPageModal"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { showPayModal } from "../action"
import axios from 'axios';

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
  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState(
    [
      { id: 0, title:"", body: 10000, logo: "", message: "", ngoId: 0}
    ]
  );
  const [repeatData, setrepeatData] = useState(
    [
      { id: 0, title:"", body: 10000, logo: "", message: "", ngoId: 0}
    ]
  );

  useEffect(() => {
    axios.get("http://localhost:5000/paypage", {
    params: {
      user_id: 1,
    }
    })
    .then(res => {
      const pocketList = res.data;
      let onceList: any[] = [];
      let repeatList: any[] = [];
      for (let pocketIdx=0; pocketIdx<pocketList.length; pocketIdx++) {
        if (pocketList[pocketIdx].type === 'once') {
          onceList.push({
            id: pocketList[pocketIdx].id,
            title: pocketList[pocketIdx].ngo.name,
            body: pocketList[pocketIdx].money,
            logo: pocketList[pocketIdx].ngo.logo,
            ngoId: pocketList[pocketIdx].ngo.id,
          })
        } else {
          repeatList.push({
            id: pocketList[pocketIdx].id,
            title: pocketList[pocketIdx].ngo.name,
            body: pocketList[pocketIdx].money,
            logo: pocketList[pocketIdx].ngo.logo,
            ngoId: pocketList[pocketIdx].ngo.id,
          })
        }
      }
      setData(onceList);
      setrepeatData(repeatList);
    })
    .catch(err => console.log(err))
    setLoading(true);
  }, [])

  const [currentItem, setCurrentItem] = useState(-1);

  const onDragOver = (event: any) => {
    event.preventDefault()
  }

  const drop = (event: any, type: string) => {
    if (currentItem !== -1) {
      if (type === 'once') {
        const dataList = data.map(el => el.id);
        if (dataList.includes(currentItem)) return;
        axios.patch("http://localhost:5000/pocket", {
          pocketId: currentItem,
          type: 'once',
          money: repeatData.filter(el => el.id === currentItem)[0].body,
        })
        setrepeatData(repeatData.filter(el => el.id !== currentItem));
        const ingTask = repeatData.filter(el => el.id === currentItem);
        setData([...data, ingTask[0]]);
      } else {
        const dataList = repeatData.map(el => el.id);
        if (dataList.includes(currentItem)) return;
        axios.patch("http://localhost:5000/pocket", {
          pocketId: currentItem,
          type: 'repeat',
          money: data.filter(el => el.id === currentItem)[0].body,
        })
        setData(data.filter(el => el.id !== currentItem));
        const ingTask = data.filter(el => el.id === currentItem);
        setrepeatData([...repeatData, ingTask[0]]);
      }
    }
    event.preventDefault();
  }

  const deleteItem = async (pocketId: number) => {
    await axios.delete("http://localhost:5000/pocket", {
      data: {
        pocketId,
      }
    })
    .then(() => {
      setData(data.filter(el => el.id !== pocketId));
      setrepeatData(repeatData.filter(el => el.id !== pocketId))
    })
    .catch(err => console.log(err))
  }

  const moneySet = (pocketId: number, value: string) => {
    setData(data.map(el => el.id === pocketId ? {...el, body: Number(value)} : el));
    setrepeatData(repeatData.map(el => el.id === pocketId ? {...el, body: Number(value)} : el));
    axios.patch("http://localhost:5000/pocket", {
      pocketId,
      money: Number(value),
    })
  }

  const itemRenderer = (item: any) => {
    return (
      <div className="payBoxContent shadow" draggable="true" onDrag={()=>setCurrentItem(item.id)}>
        <div className="payBoxContentImg" style={{ backgroundImage: `url(${item.logo})`}}></div>
      <div className="payBoxContentTitle" style={{background: item.color}}>
        <p>{item.title}</p>
        <div>
          {/* item.id: {item.id} - index: {index} */}
          <select className="selectMoney" value={item.body} onChange={(e) => moneySet(item.id, e.target.value)}>
            <option value="10000">10,000원</option>
            <option value="20000">20,000원</option>
            <option value="30000">30,000원</option>
            <option value="40000">40,000원</option>
            <option value="50000">50,000원</option>
          </select>
          
        </div>
      </div>
      <div className="payBoxContentDelete" onClick={() => deleteItem(item.id)}>
        X
      </div>
      </div>
    )
  }

  const saveMessage = (pocketId: number, message: string, type: string) => {
    if (type === 'once') {
      setData(data.map(el => el.id === pocketId ? {...el, message,} : el))
    } else {
      setrepeatData(repeatData.map(el => el.id === pocketId ? {...el, message,} : el))
    }
  }

  const pay = async () => {
    for (let item of data) {
      await axios.post("http://localhost:5000/donation", {
        userId: 1,
        ngoId: item.ngoId,
        money: item.body,
        type: 'once',
        ing: 'false',
        message: item.message,
      })
      .then(() => deleteItem(item.id))
      .catch(err => console.log(err))
    }

    for (let item of repeatData) {
      await axios.post("http://localhost:5000/donation", {
        userId: 1,
        ngoId: item.ngoId,
        money: item.body,
        type: 'repeat',
        ing: true,
        message: item.message,
      })
      .then(() => deleteItem(item.id))
      .catch(err => console.log(err))
    }
    alert('결제가 완료되었습니다');
    window.location.href = "./mypage"
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
  <>
  { !isLoading ? <div>로딩중</div> :
  <div id="payPageContainer" onMouseUp={()=>setCurrentItem(-1)}>
    <PayPageModal />
    <div id="payNavPart">
      <div className="navLogo" onClick={handleLogoClick}>B I N G O</div>
      <div className="navMyPage shadow" onClick={handleMyPageClick}>mypage</div>
    </div>
    <div id="payListPart">
      {state.payMessageInfo.messageDisplay ? (
        <div className="payListEntryPart shadow" onDragOver={(event) => onDragOver(event)} onDrop={(event) => drop(event, 'once')}>
        <div className="payBoxTitle">일시후원하기</div>
        <div className="payBoxContentBox">
          {
            data.map(el => itemRenderer(el))
          }
        </div>
      </div>
      ) : null}

      {state.payMessageInfo.messageDisplay ? (
        <div className="payListEntryPart shadow" onDragOver={(event) => onDragOver(event)} onDrop={(event) => drop(event, 'repeat')}>
        <div className="payBoxTitle">정기후원하기</div>
        <div className="payBoxContentBox">
          {
            repeatData.map(el => itemRenderer(el))
          }
        </div>
      </div>
      ) : null}

      <div className="payBoxPayBtnBox">
        <div>총후원금: {data.reduce((a, c) => {
          return Number(a) + Number(c.body);
        }, 0) + repeatData.reduce((a, c) => {
          return Number(a) + Number(c.body);
        }, 0)} ₩</div>
        <button className="payBoxPayBtn" onClick={handleClickPayBtn}>결제하기</button>
      </div>

      {state.payMessageInfo.messageDisplay ? 
        null : 
        (<div className="payListEntryPart shadow">
        <div className="payBoxTitle">응원메세지</div>
        <div id="payBoxSubTitle">각 단체에게 힘이 되는 따뜻한 말을 남겨주세요</div>
        <div id="payBoxPostMessageBox">
          {data.map((item) => {
            return(
            <div key ={item.id} className="payPagePostMessage shadow">
              <div className="payBoxPostMessageImg" style={{ backgroundImage: `url(${item.logo})`}}></div>
              <div>{item.title}</div>
              <input onChange={(e) => saveMessage(item.id, e.target.value, 'once')}></input>
            </div>
            )
          })}
          {repeatData.map((item) => {
            return(
            <div key ={item.id} className="payPagePostMessage shadow">
              <div className="payBoxPostMessageImg" style={{ backgroundImage: `url(${item.logo})`}}></div>
              <div>{item.title}</div>
              <input onChange={(e) => saveMessage(item.id, e.target.value, 'repeat')}></input>
            </div>
            )
          })}
        </div>
        <div className="payBoxPayBtnBox" style={{flexDirection: "row-reverse"}}>
          <button className="payBoxPayBtn" onClick={() => pay()}>남기기</button>
        </div>
      </div>
      )}
    </div>
  </div>
  }
  </>
  )
}

export default withRouter(PayPage);