import { withRouter } from "react-router";
import "./css/ListPage.css";
import ListContentList from "../components/ListContentList";
import store from "../store";
import axios from "axios";
import { changeUserInfo, showList, showContent } from "../action";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { changeList } from "../action";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";

function ListPage(props: any) {
  const [category, setCategory] = useState([
    ["전체", "https://ifh.cc/g/QIUoyt.png"],
    ["아동", "https://ifh.cc/g/jQOkYQ.png"],
    ["장애인", "https://ifh.cc/g/sEQiUx.png"],
    ["여성", "https://ifh.cc/g/1VjOOz.png"],
    ["성소수자", "https://ifh.cc/g/uMeLdG.png"],
    ["동물", "https://ifh.cc/g/oKw5XI.png"],
    ["환경", "https://ifh.cc/g/mMAjPS.png"],
    ["노인", "https://ifh.cc/g/SIidJ4.png"],
    ["보건", "https://ifh.cc/g/6bgLMg.png"],
    ["다문화", "https://ifh.cc/g/MQxSvS.png"],
  ]);
  const [displaySearch, setDisplaySearch] = useState(false);
  const state = useSelector((state: RootState) => state.listReducer);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [bannerHeight, setHeight] = useState(50);
  const [scroll, setscroll] = useState(0);
  const [curCategory, setCurCategory] = useState("전체");

  document.addEventListener("scroll", function () {
    if (document.documentElement.scrollTop > 0) {
      setHeight(25)
    } else {
      setHeight(50)
    }
  });

  const getAccessTokenGoogle = async (authorizationCode: string) => {
    await axios.post("http://localhost:5000/googlelogin", {
      authorizationCode,
    }, {
      withCredentials: true,
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
    // await fetch("http://localhost:5000/googlelogin", {
    //   credentials: "include",
    //   method: "POST",
    //   body: JSON.stringify({
    //     authorizationCode,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  };
  const getAccessTokenKakao = async (authorizationCode: string) => {
    await axios.post("http://localhost:5000/kakaologin", {
      authorizationCode,
    }, {
      withCredentials: true,
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
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
      getAccessTokenGoogle(authorizationCode)
      .then(() => getAccessTokenKakao(authorizationCode))
      .then(() => window.location.href = `/test`)
    }

    
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
        ["전체", "https://ifh.cc/g/QIUoyt.png"],
    ["아동", "https://ifh.cc/g/jQOkYQ.png"],
    ["장애인", "https://ifh.cc/g/sEQiUx.png"],
    ["여성", "https://ifh.cc/g/1VjOOz.png"],
    ["성소수자", "https://ifh.cc/g/uMeLdG.png"],
    ["동물", "https://ifh.cc/g/oKw5XI.png"],
    ["환경", "https://ifh.cc/g/mMAjPS.png"],
    ["노인", "https://ifh.cc/g/SIidJ4.png"],
    ["보건", "https://ifh.cc/g/6bgLMg.png"],
    ["다문화", "https://ifh.cc/g/MQxSvS.png"],
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
    setCurCategory(category);
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

  useEffect(() => {
    console.log(scroll);
  }, [scroll])

  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div id='listPageContainer' onWheel={e => setscroll(window.scrollY)}>
          <div id='listNavPart'>
            <div className='navLogo' onClick={handleLogoClick}>
              B I N G O
            </div>
            <div className='navMyPage shadow' onClick={handleMyPageClick}>
              마이페이지
            </div>
          </div>
          <div id='listCoverPart' style={{ height: `${bannerHeight}rem`, }}></div>
          <div id='listMainPart'>
            <div id='listMainTitle' className='shadow'>
              더 많은 NGO단체 찾아보기
            </div>
            <div id='listSearchBox'>
              <div id='listSearchCategory'>
                <div id='listSearchTitleBox'>
                  {category.map(item => {
                    return (
                      <div id="listSearchTitlePart">
                      {curCategory === item[0] ?
                      (<div
                        className='listSearchTitle'
                        onClick={() => handleCategoryClick(item[0])}
                        style={{backgroundColor:"beige"}}
                      >
                      <div>
                        <img id="listSearchImg" src={item[1]} alt="categoryImg"/>
                      </div>
                      </div>):(
                        <div
                        className='listSearchTitle'
                        onClick={() => handleCategoryClick(item[0])}
                      >
                      <div>
                        <img id="listSearchImg" src={item[1]} alt="categoryImg"/>
                      </div>
                      </div>
                      )}
                      <div id="listSearchName">{item[0]}</div>
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
                    className='listSearchTitle'
                    onClick={handleSearchClick}
                  >
                    <i className='fas fa-search'></i>
                  </div>
                )}
              </div>
            </div>
            {result.length === 0 && <ListContentList />}
            {result.length > 0 && (
              <div id='ListContentSearchResultContainer'>
              <div className='card'>
                {result.map((item: any) => {
                  return (
                    <Link onClick={()=> handleContentListEntryClick(item.id)} to="/content">
          <div
            id='ListContentSearchContentBox'
          >
            <div>
              <div id="ListContentEntryLogoBox">
              <img
                id='ListContentEntryLogo'
                alt='NgoLogo'
                src={item.logo}
              />
              </div>
            </div>
              <div className='listSearchDescription'>
                <div id='ListContentEntryTitle'>{item.name}</div>
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
      <Footer></Footer>
    </>
  );
}
export default withRouter(ListPage);
