import { withRouter } from "react-router";
import "./css/ListPage.css";
import ListContentList from "../components/ListContentList";
import store from "../store";
import axios from "axios";
import { changeUserInfo, showList } from "../action";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { changeList } from "../action";
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

  const getAccessTokenGoogle = async (authorizationCode: string) => {
    await fetch("http://localhost:5000/googlelogin", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        authorizationCode,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const getAccessTokenKakao = async (authorizationCode: string) => {
    await fetch("http://localhost:5000/kakaologin", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        authorizationCode,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const logout = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        console.log("로그아웃 res:", res);
      })
      .catch((err) => console.log(err));
  };
  const checkGoogleAuth = async () => {
    await fetch("http://localhost:5000/checkgoogleauth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.data.accessToken) dispatch(changeUserInfo(res.data));
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const checkKakaoAuth = async () => {
    await fetch("http://localhost:5000/checkkakaoauth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.data.accessToken) dispatch(changeUserInfo(res.data));
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {

    checkGoogleAuth()
    .then(() => checkKakaoAuth())
    .then(() => {
      axios
      .get("http://localhost:5000/listpage")
      .then(res => {
        return res.data.data;
      })
      .then((data) => dispatch(showList(data)))
      .then(() => setLoading(false))
      .catch(err => console.log("list_err:", err));
    })

    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) {
      getAccessTokenGoogle(authorizationCode);
      getAccessTokenKakao(authorizationCode);
      window.location.href = `/test`;
    }

    
    
    
  }, []);

  const handleLogoClick = () => {
    window.location.href = "./guide.html";
  };

  const handleMyPageClick = () => { //마이페이지로 이동
    props.history.push('/mypage');
  };
  
  const handleSearchClick = () => {
    if (displaySearch) {
      //검색 닫기 버튼 누를떄
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
      //검색 버튼 누를때
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
      console.log("reeeeee:", result);
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
              <div className='card'>
                {result.map((item: any) => {
                  return (
                    <div
                      id='ListContentEntryContainer'
                      className='shadow'
                      // onClick={handleContentListEntryClick}
                    >
                      <div className='front'>
                        <div id='ListContentEntryLogoBox'>
                          <img
                            id='ListContentEntryLogo'
                            alt='NGO_logo'
                            src={item.logo}
                          />
                        </div>
                        <div id='ListContentEntryTitle'>{item.name}</div>
                      </div>
                      <div className='back'>
                        <div id='ListContentEntryDescription'>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default withRouter(ListPage);
