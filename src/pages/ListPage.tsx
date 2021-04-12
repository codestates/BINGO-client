import { withRouter } from "react-router";
import "./css/ListPage.css";
import ListContentList from "../components/ListContentList"
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
    <div id="listNavLogo" onClick={handleLogoClick}>B I N G O</div>
    <div id="listMyPageBtn" className="shadow" onClick={handleMyPageClick}>마이페이지</div>
    </div>
    <div id="listCoverPart"></div>
    <div id="listMainPart">
      <div id="listMainTitle">더 많은 NGO단체 찾아보기</div>
      <div id="listSearchBox">
        <div id="listSearchCategory">
          <span>All</span>
          <span>여성</span>
          <span>동물</span>
          <span>어르신</span>
          <span>아동/청소년</span>
          <span>성소수자</span>
          <span>환경</span>
          <span>인권</span>
        </div>
        <div id="listSearchKeyword">검색</div>
      </div>
      <ListContentList/>
    </div>
  </div>
  )
}

export default withRouter(ListPage);