import { withRouter } from "react-router";
import "./css/ListPage.css";
import ListContentList from "../components/ListContentList";
import store from "../store";
import axios from "axios";
import { showList, showContent } from "../action";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { changeList } from "../action";
import { Link } from 'react-router-dom';

function ListPage(props: any) {
  const [category, setCategory] = useState([
    "전체",
    "아동",
    "장애인",
    "여성",
    "성소수자",
    "동물",
    "환경",
    "노인",
    "보건",
    "다문화",
  ]);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [dataOfCategory, setDataOfCategory] = useState("전체");
  const state = useSelector((state: RootState) => state.listReducer);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/listpage")
      .then(res => {
        console.log("check get list:", res.data.data);
        const lists = res.data.data;
        dispatch(showList(lists));
      })
      .then(() => setLoading(false))
      .catch(err => console.log("list_err:", err));
  }, []);
  const handleLogoClick = () => {
    window.location.href = "./guide.html";
  };

  const handleMyPageClick = () => { //마이페이지로 이동
    props.history.push('/mypage');
  };

  const handleContentListEntryClick = (ngoId: number) => {
    dispatch(showContent(ngoId));
  };
  
  const handleSearchClick = () => {
    if (displaySearch) {
      setCategory([
        "전체",
        "아동",
        "장애인",
        "여성",
        "성소수자",
        "동물",
        "환경",
        "노인",
        "보건",
        "다문화",
      ]);
      setDisplaySearch(false);
      setResult([]);
      setQuery("");
    } else {
      setCategory([]);
      setDisplaySearch(true);
    }
  };

  const handleCategoryClick = (category: string) => {
    dispatch(changeList(category));
  };

  let findname: any;

  useEffect(() => {
    if (query) {
      findname = state.listInfo.data.filter((item: any) =>
        item.name.includes(query)
      );
    }
    if (findname) {
      setResult(findname);
    } else {
      setResult([]);
    }
  }, [query]);

  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div id='listPageContainer'>
          <div id='listNavPart'>
            <div className='navLogo' onClick={handleLogoClick}>
              B I N G O
            </div>
            <div className='navMyPage shadow' onClick={handleMyPageClick}>
              마이페이지
            </div>
          </div>
          <div id='listCoverPart'></div>
          <div id='listMainPart'>
            <div id='listMainTitle' className='shadow'>
              더 많은 NGO단체 찾아보기
            </div>
            <div id='listSearchBox'>
              <div id='listSearchCategory'>
                <div id='listSearchTitleBox'>
                  {category.map(item => {
                    return (
                      <div
                        className='listSearchTitle shadow'
                        onClick={() => handleCategoryClick(item)}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
                {displaySearch ? (
                  <div id='listSearchTextBox'>
                    <i
                      id='listSearchTextClose'
                      className='fas fa-times'
                      onClick={handleSearchClick}
                    ></i>
                    <input
                      type='test'
                      id='listSearchText'
                      placeholder='검색할 단체를 입력하세요'
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                    ></input>
                  </div>
                ) : (
                  <div
                    id='listSearchKeyword'
                    className='listSearchTitle shadow'
                    onClick={handleSearchClick}
                  >
                    <i className='fas fa-search'></i>
                  </div>
                )}
              </div>
            </div>
            {result.length === 0 && <ListContentList />}
            {result.length > 0 && (
              <div id='listContentListContainer'>
              <div className='card'>
                {result.map((item: any) => {
                  return (
                    <Link onClick={()=> handleContentListEntryClick(item.id)} to="/content">
          <div
            id='ListContentEntryContainer'
            className='shadow'
          >
            <div className='front'>
              <div id="ListContentEntryLogoBox">
              <img
                id='ListContentEntryLogo'
                alt='NgoLogo'
                src={item.logo}
              />
              </div>
              <div id='ListContentEntryTitle'>{item.name}</div>
            </div>
              <div className='listBackPart'>
              <div id='ListContentEntryDescription'>{item.description}</div>
            </div>
          </div>
          </Link>
                  );
                })}
              </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default withRouter(ListPage);
