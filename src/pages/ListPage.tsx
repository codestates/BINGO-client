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
    if (document.documentElement.scrollTop > 100) {
      setHeight(25)
    }
    if (document.documentElement.scrollTop === 0) {
      setHeight(50)
    }
    
  });

  const getAccessTokenGoogle = async (authorizationCode: string) => {
    await axios.post("https://server.ibingo.link/googlelogin", {
      authorizationCode,
    }, {
      withCredentials: true,
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  };
  const getAccessTokenKakao = async (authorizationCode: string) => {
    await axios.post("https://server.ibingo.link/kakaologin", {
      authorizationCode,
    }, {
      withCredentials: true,
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  };
  
  const checkGoogleAuth = async () => {
    await fetch("https://server.ibingo.link/checkgoogleauth", {
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
    await fetch("https://server.ibingo.link/checkkakaoauth", {
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
      .get("https://server.ibingo.link/listpage")
      .then(res => {
        return res.data.data;
      })
      .then((data) => dispatch(showList(data)))
      .then(() => {
        setTimeout(() => {
          setLoading(false)
        }, 1500)
        
      })
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

  const [justify, setJustify] = useState('center');
  const [searchStyle, setSearchStyle] = useState(['5.4rem', '50%']);

  const handleSearchClick = () => {
    console.log(document.body.offsetWidth)
    setJustify('flex-end')
    if (displaySearch) {
      
    } else {
      setCategory([]);
      setDisplaySearch(true);
      if (document.body.offsetWidth < 520) {
        setSearchStyle(['90%', '40px'])
      } else {
        setSearchStyle(['30rem', '40px'])
      }
    }
  };

  const closeSearch = () => {
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
    setSearchStyle(['5.4rem', '50%']);
    setDisplaySearch(false);
    setResult([]);
    setQuery("");

  }

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

  return (
    <>
      {isLoading ? (
        <div id="loading"><img src="https://s3.ap-northeast-2.amazonaws.com/ibingo.link/images/%EC%B5%9C%EC%A0%95%ED%98%B8+%EB%B3%B4%EA%B1%B0%EB%9D%BC%EB%9D%BC.gif" id="loadingImg"></img></div>
      ) : (
        <div id='listPageContainer' onWheel={e => setscroll(window.scrollY)}>
          
          <div id='listCoverPart' style={{ height: `${bannerHeight}rem`, }}>
            <div id='listNavPart'>
              <div className='navLogo' onClick={handleLogoClick}>
                B I N G O
              </div>
              <div className='navMyPage shadow' onClick={handleMyPageClick}>
                나의 빙고
              </div>
            </div>
            <div id="listTitle">
              슬기로운<br></br>후원생활
              <div id="listSubTitle">BINGO와 함께 후원할 단체를 만나보세요.</div>
            </div>
          </div>
          <div id='listMainPart'>
            <div id='listMainTitle' className='shadow'>
              더 많은 NGO단체 찾아보기
            </div>
            <div id='listSearchBox' style={{ justifyContent: justify }}>
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
                  
                  <div
                    id='listSearchKeyword'
                    className='listSearchTitle'
                    onClick={handleSearchClick}
                    style={{ width: `${searchStyle[0]}`, borderRadius: `${searchStyle[1]}` }}
                  >
                    <i className='fas fa-search'></i>
                    {
                      displaySearch ? (
                        <div id='listSearchTextBox'>
                          <input
                            type='test'
                            id='listSearchText'
                            placeholder='검색할 단체를 입력하세요'
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                          ></input>
                          <div
                            id='listSearchTextClose'
                            className='fas fa-times'
                            onClick={closeSearch}
                          ></div>
                        </div>
                      ) : null
                    }
                  </div>
                
                </div>
                
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
          <Footer></Footer>
        </div>
      )}
    </>
  );
}
export default withRouter(ListPage);
