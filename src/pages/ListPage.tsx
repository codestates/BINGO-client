import { withRouter } from "react-router";
import "./css/ListPage.css";
import ListContentList from "../components/ListContentList";
import store from "../store";
import { useEffect, useState } from "react";
import axios from 'axios';
import { showList } from "../action";
import { useDispatch } from 'react-redux';

function ListPage() {
  const [categoryNum, setCategoryNum] = useState(0);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/listpage")
      .then(res => {
        console.log("check get list:", res.data.data);
        const lists = res.data.data;

        dispatch(showList(lists));
      })
      .then(()=> setLoading(false))
      .catch(err => console.log("list_err:", err));
    // dispatch(showList(lists));
  }, []);

  const handleClickBtn = () => {
    store.dispatch({ type: "INCREMENT", size: categoryNum });
  };

  const handleLogoClick = () => {
    window.location.href = "./guide.html";
  };
  const handleMyPageClick = () => {
    window.location.href = "./mypage";
  };
  const handleSearchClick = () => {
    alert("checkonclick!");
  };

  return (
    <>
    { isLoading ? <div>로딩중</div> :
    <div id='listPageContainer'>
      <div id='listNavPart'>
        <div id='listNavLogo' onClick={handleLogoClick}>
          B I N G O
        </div>
        <div id='listMyPageBtn' className='shadow' onClick={handleMyPageClick}>
          마이페이지
        </div>
      </div>
      <div id='listCoverPart'></div>
      <div id='listMainPart'>
        <div id='listMainTitle'>더 많은 NGO단체 찾아보기</div>
        <div id='listSearchBox'>
          <div id='listSearchCategory'>
            <div className='listSearchTitle'>All</div>
            <div className='listSearchTitle'>여성</div>
            <div className='listSearchTitle'>동물</div>
            <div className='listSearchTitle'>어르신</div>
            <div className='listSearchTitle'>아동/청소년</div>
            <div className='listSearchTitle'>성소수자</div>
            <div className='listSearchTitle'>환경</div>
            <div className='listSearchTitle'>인권</div>
          </div>
          <div id='listSearchKeyword' onClick={handleSearchClick}>
            검색
          </div>
        </div>
        <ListContentList />
      </div>
    </div>
}
</>
  );
}

export default withRouter(ListPage);
