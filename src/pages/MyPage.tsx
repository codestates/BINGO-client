import { withRouter } from "react-router";
import "./css/MyPage.css";
import MyRegularDonationList from "../components/MyRegularDonationList";
import MyCitizenInfo from "../components/MyCitizenInfo";
import MyAllDonationGraph from "../components/MyAllDonationGraph";
import MyMonthlyDonationGraph from "../components/MyMonthlyDonationGraph";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { showMypage, showMypageModal, showMyProfileEditModal } from "../action";
import axios from "axios";
import MyPageModal from "../components/MyPageModal";
import MyProfileEditModal from "../components/MyProfileEditModal";

function MyPage(props: any) {
  const state = useSelector((state: RootState) => state.loginReducer);
  const { userInfo } = state;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [display, setDisplay] = useState("none");
  const [btnDisplay, setbtnDisplay] = useState("block");
  const [opacity, setOpacity] = useState(0);

  const handleLogoClick = () => {
    window.location.href = "./guide.html";
  };
  const logout = async () => {
    await fetch("https://server.ibingo.link/logout", {
      method: "POST",
      credentials: "include",
    })
    .then(() => {
      dispatch(logout);
    })
    .then(() => {
      window.location.href = "./guide.html";
    })
    .catch(err => console.log(err));
    
  };

  const handleListPageClick = () => {
    props.history.push("/list");
  };
  const handlePayPageClick = () => {
    props.history.push("/pay");
  };
  const handleTestPageClick = () => {
    props.history.push("/test");
  };
  const handleEditClick = () => {
    dispatch(showMyProfileEditModal(true));
  };
  useEffect(() => {
    axios
      .get(`https://server.ibingo.link/mypage?user_id=${userInfo.userId}`, {
        headers: {
          authorization: `${userInfo.accessToken}`,
        },
      })
      .then(res => {
        console.log(res.data);
        dispatch(showMypage(res.data));
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
      .catch(err => console.log(err));

  }, []);

  return (
  <>
  { isLoading ? <div id="loading"><img src="https://s3.ap-northeast-2.amazonaws.com/ibingo.link/images/%EC%B5%9C%EC%A0%95%ED%98%B8+%EB%B3%B4%EA%B1%B0%EB%9D%BC%EB%9D%BC.gif" id="loadingImg"></img></div> :
  <div id="myPageContainer">
    <MyPageModal />
    <MyProfileEditModal />
      <div id="myPageNavPart">
        <div id="myPageNavLogo" onClick={handleLogoClick}>B I N G O</div>
          <div id="navBox" onMouseOver={() => {setDisplay('block'); setbtnDisplay('none'); setOpacity(1);}} onMouseOut={() => {setDisplay('none'); setbtnDisplay('block'); setOpacity(0);}}>
            <div id="myPageNavBtn" className="shadow" style={{ display: btnDisplay}}>페이지 이동</div>
            <div id="myPagePayPageBtn" className="shadow" onClick={handleListPageClick} style={{ display, opacity }}>홈</div>
            <div id="myPagePayPageBtn" className="shadow" onClick={handlePayPageClick} style={{ display, opacity }}>결제페이지</div>
            <div id="myPageTestBtn" className="shadow" onClick={handleTestPageClick} style={{ display, opacity }} >테스트</div>
          </div>
        </div>
        <div id='myPageCoverPart'></div>
          <div id='myPageMainPart'>
            <div id='myPageUserInfo'>
              <div
                id='myPageProfilePic'
                className='shadow'
                style={{ backgroundImage: `url(${userInfo.profileImage})` }}
              ></div>
              <div id="myPageLevel">Level {userInfo.level}</div>
            <div id='myPageUsername'>{userInfo.username}</div>
            <i className='fas fa-pen' onClick={handleEditClick} />
            <div id="myPageLogout" onClick={logout}>로그아웃</div>
          </div>
          <div id='myPageMainContent'>
            <MyRegularDonationList />
            <div id='myPageMainContentMiddle'>
              <MyCitizenInfo />
              <MyAllDonationGraph />
            </div>
            <MyMonthlyDonationGraph />
            </div>
          </div>
          <Footer/>
        </div>
      }
    </>
  );
}
export default withRouter(MyPage);
