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

  const handleLogoClick = () => {
    window.location.href = "./guide.html"
  }
  const handlePayPageClick = () => {
    props.history.push('/pay')
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
          <div id="navBox">
            <div id="myPagePayPageBtn" className="shadow" onClick={handlePayPageClick}>페이페이지</div>
            <div id="myPageLogoutBtn" className="shadow" onClick={handlePayPageClick}>로그아웃</div>
            <div id="myPageTestBtn" className="shadow" onClick={handlePayPageClick}>테스트</div>
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