import { withRouter } from "react-router";
import "./css/MyPage.css";
import MyRegularDonationList from "../components/MyRegularDonationList"
import MyCitizenInfo from "../components/MyCitizenInfo"
import MyAllDonationGraph from "../components/MyAllDonationGraph"
import MyMonthlyDonationGraph from "../components/MyMonthlyDonationGraph"
import Footer from "../components/Footer"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { showMypage, showMypageModal } from "../action"
import axios from 'axios';
import MyPageModal from "../components/MyPageModal"

function MyPage(props: any) {
  const state = useSelector((state: RootState) => state.loginReducer);
  const { userInfo } = state;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [display, setDisplay] = useState('none');
  const [btnDisplay, setbtnDisplay] = useState('block');

  document.addEventListener("scroll", function () {
    // if (!ing) {
    //   setIng(true);
    //   setOpacity(1);
    //   setRight(0);
    //   setTimeout(() => {
    //     setOpacity(0);
    //     setRight(-112);
    //     setIng(false);
    //   }, 2000);
    // }
  });

  const handleLogoClick = () => {
    window.location.href = "./guide.html"
  }
  const logout = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    })
    .then((res) => {
      console.log("로그아웃 res:", res);
    })
    .catch((err) => console.log(err));
    window.location.href = "./guide.html";
  };

  const handleListPageClick = () => {
    props.history.push('/list')
  }
  const handlePayPageClick = () => {
    props.history.push('/pay')
  }
  const handleTestClick = () => {
    props.history.push('/test')
  }
  useEffect(() => {
    axios.get(`http://localhost:5000/mypage?user_id=${userInfo.userId}`, {
      headers: {
        authorization: `${userInfo.accessToken}`
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch(showMypage(res.data));
    })
    .then(()=> setLoading(false))
    .catch(err => console.log(err))
  }, [])

  return (
  <>
  { isLoading ? <div>로딩중</div> :
  <div id="myPageContainer">
    <MyPageModal />
      <div id="myPageNavPart">
        <div id="myPageNavLogo" onClick={handleLogoClick}>B I N G O</div>
          <div id="navBox" onMouseOver={() => {setDisplay('block'); setbtnDisplay('none');}} onMouseOut={() => {setDisplay('none'); setbtnDisplay('block');}}>
            <div id="myPageTestBtn" className="shadow" onClick={handleTestClick} style={{ display: btnDisplay}}>페이지 이동</div>
            <div id="myPageTestBtn" className="shadow" onClick={handleTestClick} style={{ display }} >테스트</div>
            <div id="myPagePayPageBtn" className="shadow" onClick={handleListPageClick} style={{ display }}>리스트</div>
            <div id="myPagePayPageBtn" className="shadow" onClick={handlePayPageClick} style={{ display }}>페이페이지</div>
            <div id="myPageLogoutBtn" className="shadow" onClick={logout} style={{ display }}>로그아웃</div>
          </div>
      </div>
    <div id="myPageCoverPart">
    </div>
    <div id="myPageMainPart">
      <div id="myPageUserInfo">
        <div id="myPageProfilePic" className="shadow" style={{ backgroundImage: `url(${userInfo.profileImage})`}}></div>
        <div id="myPageUsername">{userInfo.username}</div>
        <div>Level {userInfo.level}</div>
      </div>
      <div id="myPageMainContent">
        <MyRegularDonationList />
        <div id="myPageMainContentMiddle">
          <MyCitizenInfo />
          <MyAllDonationGraph />
        </div>
        <MyMonthlyDonationGraph />
      </div>
    </div>
    <Footer />
  </div>
  }
  </>
  )
}
export default withRouter(MyPage);