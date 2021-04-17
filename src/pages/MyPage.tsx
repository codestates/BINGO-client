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

function MyPage() {
  const state = useSelector((state: RootState) => state.loginReducer);
  const { userInfo, mypageInfo } = state;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
<<<<<<< HEAD
=======

>>>>>>> 5e8d7d7f41e79a6f17278b78af6906b29779cfb4
  const handleLogoClick = () => {
    window.location.href = "./guide.html"
  }
  const handlePayPageClick = () => {
    window.location.href = "./pay"
  }
  useEffect(() => {
    axios.get(`http://localhost:5000/mypage?user_id=${userInfo.id}`)
    .then((res) => {
      dispatch(showMypage(res.data));
    })
<<<<<<< HEAD
    .then(() => setLoading(false))
=======
    .then(()=> setLoading(false))
    .catch(err => console.log(err))
>>>>>>> 5e8d7d7f41e79a6f17278b78af6906b29779cfb4
  })

  return (
  <>
  { isLoading ? <div>로딩중</div> :
  <div id="myPageContainer">
    <MyPageModal />
      <div id="myPageNavPart">
        <div id="myPageNavLogo" onClick={handleLogoClick}>B I N G O</div>
          <div>
            <div id="myPagePayPageBtn" className="shadow" onClick={handlePayPageClick}>페이페이지</div>
            <div id="myPageLogoutBtn" className="shadow" onClick={handlePayPageClick}>로그아웃</div>
          </div>
      </div>
    <div id="myPageCoverPart">
    </div>
    <div id="myPageMainPart">
      <div id="myPageUserInfo">
        <div id="myPageProfilePic" className="shadow"></div>
        <div id="myPageUsername">JH Choi</div>
        <div>Level 3</div>
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