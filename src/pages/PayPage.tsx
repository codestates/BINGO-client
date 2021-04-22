import { withRouter } from "react-router";
import "./css/PayPage.css";
import React, { useEffect, useState } from "react";
import PayPageModal from "../components/PayPageModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { showPayModal, showPostMessage } from "../action";
import axios from "axios";
import Footer from '../components/Footer';
import TestFooter from '../components/TestFooter';

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

function PayPage(props: any) {
  const state = useSelector((state: RootState) => state.payReducer);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const userState = useSelector((state: RootState) => state.loginReducer);
  const { userInfo } = userState;
  const [zIndex, setzIndex] = useState(10);

  const [data, setData] = useState([
    { id: 0, title: "", body: 10000, logo: "", message: "", ngoId: 0 },
  ]);
  const [repeatData, setrepeatData] = useState([
    { id: 0, title: "", body: 10000, logo: "", message: "", ngoId: 0 },
  ]);

  useEffect(() => {
    axios
      .get("https://server.ibingo.link/paypage", {
        headers: {
          authorization: `${userInfo.accessToken}`,
        },
        params: {
          user_id: userInfo.userId,
        },
      })
      .then(res => {
        const pocketList = res.data;
        let onceList: any[] = [];
        let repeatList: any[] = [];
        for (let pocketIdx = 0; pocketIdx < pocketList.length; pocketIdx++) {
          if (pocketList[pocketIdx].type === "once") {
            onceList.push({
              id: pocketList[pocketIdx].id,
              title: pocketList[pocketIdx].ngo.name,
              body: pocketList[pocketIdx].money,
              logo: pocketList[pocketIdx].ngo.logo,
              ngoId: pocketList[pocketIdx].ngo.id,
            });
          } else {
            repeatList.push({
              id: pocketList[pocketIdx].id,
              title: pocketList[pocketIdx].ngo.name,
              body: pocketList[pocketIdx].money,
              logo: pocketList[pocketIdx].ngo.logo,
              ngoId: pocketList[pocketIdx].ngo.id,
            });
          }
        }
        setData(onceList);
        setrepeatData(repeatList);
      })
      .catch(err => console.log(err));
    setLoading(true);
    setTimeout(() => {
      setzIndex(-10);
    }, 5000)
  }, []);

  const [currentItem, setCurrentItem] = useState(-1);

  const onDragOver = (event: any) => {
    event.preventDefault();
  };

  const drop = (event: any, type: string) => {
    if (currentItem !== -1) {
      if (type === "once") {
        const dataList = data.map(el => el.id);
        if (dataList.includes(currentItem)) return;
        axios.patch("https://server.ibingo.link/pocket", {
          accessToken: userInfo.accessToken,
          pocketId: currentItem,
          type: "once",
          money: repeatData.filter(el => el.id === currentItem)[0].body,
        });
        setrepeatData(repeatData.filter(el => el.id !== currentItem));
        const ingTask = repeatData.filter(el => el.id === currentItem);
        setData([...data, ingTask[0]]);
      } else {
        const dataList = repeatData.map(el => el.id);
        if (dataList.includes(currentItem)) return;
        axios.patch("https://server.ibingo.link/pocket", {
          accessToken: userInfo.accessToken,
          pocketId: currentItem,
          type: "repeat",
          money: data.filter(el => el.id === currentItem)[0].body,
        });
        setData(data.filter(el => el.id !== currentItem));
        const ingTask = data.filter(el => el.id === currentItem);
        setrepeatData([...repeatData, ingTask[0]]);
      }
    }
    event.preventDefault();
  };

  const deleteItem = async (pocketId: number) => {
    await axios
      .delete("https://server.ibingo.link/pocket", {
        headers: {
          authorization: `${userInfo.accessToken}`,
        },
        data: {
          pocketId,
        },
      })
      .then(() => {
        setData(data.filter(el => el.id !== pocketId));
        setrepeatData(repeatData.filter(el => el.id !== pocketId));
      })
      .catch(err => console.log(err));
  };

  const moneySet = (pocketId: number, value: string) => {
    setData(
      data.map(el => (el.id === pocketId ? { ...el, body: Number(value) } : el))
    );
    setrepeatData(
      repeatData.map(el =>
        el.id === pocketId ? { ...el, body: Number(value) } : el
      )
    );
    axios.patch("https://server.ibingo.link/pocket", {
      pocketId,
      money: Number(value),
    });
  };

  const itemRenderer = (item: any) => {
    return (
      <div
        className='payBoxContent shadow'
        draggable='true'
        onDrag={() => setCurrentItem(item.id)}
      >
        <div
          className='payBoxContentImg'
          style={{ backgroundImage: `url(${item.logo})` }}
        ></div>
        <div className='payBoxContentTitle' style={{ background: item.color }}>
          <p>{item.title}</p>
          <div>
            {/* item.id: {item.id} - index: {index} */}
            <select
              className='selectMoney'
              value={item.body}
              onChange={e => moneySet(item.id, e.target.value)}
            >
              <option value='10000'>10,000원</option>
              <option value='20000'>20,000원</option>
              <option value='30000'>30,000원</option>
              <option value='40000'>40,000원</option>
              <option value='50000'>50,000원</option>
            </select>
          </div>
        </div>
        <i
          className='fas fa-times payBoxContentDelete'
          onClick={() => deleteItem(item.id)}
        >
        </i>
      </div>
    );
  };

  const saveMessage = (pocketId: number, message: string, type: string) => {
    if (type === "once") {
      setData(data.map(el => (el.id === pocketId ? { ...el, message } : el)));
    } else {
      setrepeatData(
        repeatData.map(el => (el.id === pocketId ? { ...el, message } : el))
      );
    }
  };

  const pay = async () => {
    for (let item of data) {
      await axios
        .post("https://server.ibingo.link/donation", {
          accessToken: userInfo.accessToken,
          userId: userInfo.userId,
          ngoId: item.ngoId,
          money: item.body,
          type: "once",
          ing: "false",
          message: item.message,
        })
        .then(() => deleteItem(item.id))
        .catch(err => console.log(err));
    }

    for (let item of repeatData) {
      await axios
        .post("https://server.ibingo.link/donation", {
          accessToken: userInfo.accessToken,
          userId: userInfo.userId,
          ngoId: item.ngoId,
          money: item.body,
          type: "repeat",
          ing: true,
          message: item.message,
        })
        .then(() => deleteItem(item.id))
        .catch(err => console.log(err));
    }
    alert("결제가 완료되었습니다");
    dispatch(showPostMessage(true));
    props.history.push("/mypage");
  };

  const handleClickPayBtn = () => {
    if (data.length + repeatData.length === 0) {
    } else {
      const money =
        data.reduce((a, c) => {
          return Number(a) + Number(c.body);
        }, 0) +
        repeatData.reduce((a, c) => {
          return Number(a) + Number(c.body);
        }, 0);
      dispatch(showPayModal(true, money));
    }
  };

  const handleLogoClick = () => {
    window.location.href = "./guide.html";
  };
  const handleMyPageClick = () => {
    props.history.push("/mypage");
  };

  const handleClickBackBtn = () => {
    dispatch(showPostMessage(true));
  }

  return (
    <>
      {!isLoading ? (
        <div>로딩중</div>
      ) : (
        <div id='payPageContainer' onMouseUp={() => setCurrentItem(-1)}>
          <div id='payTutorialContainer' style={{ zIndex, }}>
            <div>DRAG & DROP</div>
            <i className='fas fa-mouse-pointer'> </i>
            <p>
              후원 상자 안의 NGO카드를 드래그앤드롭해서
              <br /> 후원유형을 자유롭게 변경하세요
            </p>
          </div>
          <PayPageModal />
          <div id='payNavPart'>
            <div className='navLogo' onClick={handleLogoClick}>
              B I N G O
            </div>
            <div className='navMyPage shadow' onClick={handleMyPageClick}>
              mypage
            </div>
          </div>
          <div id='payListPart'>
            {state.payMessageInfo.messageDisplay ? (
              <div
              id="payTempPart"
                className='payListEntryPart shadow'
                onDragOver={event => onDragOver(event)}
                onDrop={event => drop(event, "once")}
              >
                <div className='payBoxTitle'>일시후원하기</div>
                {data.length > 0 ? (
                  <div className='payBoxContentBox'>
                    {data.map(el => itemRenderer(el))}
                  </div>
                ) : (
                  <div id='noPayList'>일시후원하기에 담은 내역이 없습니다</div>
                )}
              </div>
            ) : null}

            {state.payMessageInfo.messageDisplay ? (
              <div
              id="payRegularPart"
                className='payListEntryPart shadow'
                onDragOver={event => onDragOver(event)}
                onDrop={event => drop(event, "repeat")}
              >
                <div className='payBoxTitle'>정기후원하기</div>

                {repeatData.length > 0 ? (
                  <div className='payBoxContentBox'>
                    {repeatData.map(el => itemRenderer(el))}
                  </div>
                ) : (
                  <div id='noPayList'>정기후원하기에 담은 내역이 없습니다</div>
                )}
              </div>
            ) : null}

            {state.payMessageInfo.messageDisplay ? 
            <div className='payBoxPayBtnBox'>
              <div>
                총후원금:{" "}
                {data.reduce((a, c) => {
                  return Number(a) + Number(c.body);
                }, 0) +
                  repeatData.reduce((a, c) => {
                    return Number(a) + Number(c.body);
                  }, 0)}{" "}
                ₩
              </div>
              <button className='payBoxPayBtn' onClick={handleClickPayBtn}>
                결제하기
              </button>
            </div> : null}

            {state.payMessageInfo.messageDisplay ? null : (
              <div className='payPostMessageEntryPart'>
                <div className='payBoxTitle'>응원메세지</div>
                <div id='payMessageBoxSubTitle'>
                  각 단체에게 힘이 되는 따뜻한 말을 남겨주세요
                </div>
                <div id='payBoxPostMessageBox'>
                  {data.map(item => {
                    return (
                      <div key={item.id} className='payPagePostMessage shadow'>
                        <div
                          className='payBoxPostMessageImg'
                          style={{ backgroundImage: `url(${item.logo})` }}
                        ></div>
                        <div>{item.title}</div>
                        <textarea 
                          onChange={e =>
                            saveMessage(item.id, e.target.value, "once")
                          }
                        ></textarea>
                      </div>
                    );
                  })}
                  {repeatData.map(item => {
                    return (
                      <div key={item.id} className='payPagePostMessage shadow'>
                        <div
                          className='payBoxPostMessageImg'
                          style={{ backgroundImage: `url(${item.logo})` }}
                        ></div>
                        <div>{item.title}</div>
                        <input
                          onChange={e =>
                            saveMessage(item.id, e.target.value, "repeat")
                          }
                        ></input>
                      </div>
                    );
                  })}
                </div>
                <div id="payPostMessageBtnBox">
                  <button id='payPostMessageSubmitBtn'
                  onClick={handleClickBackBtn}>
                    뒤로가기
                  </button>
                  </div>
                <div id="payPostMessageBtnBox">
                  <button id='payPostMessageSubmitBtn' onClick={() => pay()}>
                    남기기
                  </button>
                  </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer/>
    </>
  );
}

export default withRouter(PayPage);
