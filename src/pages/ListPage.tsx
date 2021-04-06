import { withRouter } from "react-router";
import "./css/ListPage.css";

function ListPage() {
  return (
  <div id="listPageContainer">
    <div id="listNavPart">
      <img className="testNavLogo" src="" alt="bingo_logo"/>
      <div>mypage</div>
    </div>
    <div id="listBannerPart">
      <img className="listBannerImg" src="" alt="bingo_banner" />
    </div>
    <div id="listCategoryPart">
      <div className="listCategory">아동</div>
      <div className="listCategory">여성</div>
      <div className="listCategory">동물</div>
      <div className="listCategory">환경</div>
      <div className="listCategory">어르신</div>
      <div className="listCategory">다문화</div>
      <div className="listCategory">장애인</div>
      <div className="listCategory">기타</div>
      <div className="listCategory">검색</div>
    </div>
    <div id="listContentPart">
      <div className="listContent">content1</div>
      <div className="listContent">content2</div>
      <div className="listContent">content3</div>
      <div className="listContent">content4</div>
    </div>
  </div>
  )
}

export default withRouter(ListPage);