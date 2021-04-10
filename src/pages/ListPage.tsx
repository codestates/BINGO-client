import { withRouter } from "react-router";
import "./css/ListPage.css";
import ListContentEntry from "../components/ListContentEntry"
import store from "../store";
import { useState } from "react";

function ListPage() {
  const [categoryNum, setCategoryNum] = useState(0);

  const handleClickBtn = () => {
    store.dispatch({type:"INCREMENT", size:categoryNum});
  }

  const handleLogoClick = () => {
    window.location.href = "./guide.html"
  }
  const handleMyPageClick = () => {
    window.location.href = "./mypage"
  }

  return (
  <div id="listPageContainer">
    <div id="listNavPart">
      <img className="testNavLogo" src="" alt="bingo_logo" onClick={handleLogoClick}/>
      <div onClick={handleMyPageClick}>mypage</div>
    </div>
    <div id="listBannerPart">
      <img className="listBannerImg" src="" alt="bingo_banner" />
    </div>
    <div id="listCategoryPart">
      <div className="listCategory" onClick={handleClickBtn}>아동</div>
      <div className="listCategory">여성</div>
      <div className="listCategory">동물</div>
      <div className="listCategory">환경</div>
      <div className="listCategory">어르신</div>
      <div className="listCategory">다문화</div>
      <div className="listCategory">장애인</div>
      <div className="listCategory">기타</div>
      <div className="listCategory">검색</div>
    </div>
    <ListContentEntry />
  </div>
  )
}

export default withRouter(ListPage);