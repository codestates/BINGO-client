import { withRouter } from "react-router";
import "./css/ListPage.css";
import ListContentList from "../components/ListContentList";
import store from "../store";
import axios from 'axios';
import { showList } from "../action";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { changeList } from "../action";
import { Motion, spring } from 'react-motion';

function ListPage(props: any) {
  const [category, setCategory] = useState(["전체", "아동", "장애인", "여성", "성소수자", "동물", "환경", "노인", "보건", "다문화"]);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [searchWidth, setSearchWidth] = useState(6);
  const [dataOfCategory, setDataOfCategory] = useState("전체");
  const state = useSelector((state: RootState) => state.listReducer);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);
    const userId = url.searchParams.get("userId");
    const ngoIdOfLoveList = url.searchParams.get("ngoIdOfLoveList");
    if (userId) {
      console.log(userId);
    }
    if (ngoIdOfLoveList) {
      console.log(ngoIdOfLoveList);
    }
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

  const handleLogoClick = () => {
    window.location.href = "./guide.html";
  };
  const handleMyPageClick = () => {
    props.history.push('/mypage');
  };
  const handleSearchClick = () => {
    if(displaySearch) { //검색 닫기 버튼 누를떄
      setCategory(["전체", "아동", "장애인", "여성", "성소수자", "동물", "환경", "노인", "보건", "다문화"]);
      setDisplaySearch(false);
      setResult([]);
      setQuery("");
      setSearchWidth(6);
    } else { //검색 버튼 누를때
      setCategory([]);
      setDisplaySearch(true);
      setSearchWidth(23);
    }
  };

  const handleCategoryClick = (category: string) => {
    dispatch(changeList(category))
  }

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
    { isLoading ? <div>로딩중</div> :
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
        <div id='listMainTitle' className="shadow">더 많은 NGO단체 찾아보기</div>
        <div id='listSearchBox'>
          <div id='listSearchCategory'>
            {category.map((item) => {return(
              <div className='listSearchTitle shadow' onClick={() => handleCategoryClick(item)}>{item}</div>
            )})}
            <Motion style={{ width: spring(searchWidth) }}>
            {
              ({ width}) => 
            <div id="listSearchKeyword" className='listSearchTitle' onClick={handleSearchClick} style={Object.assign({}, {}, { width: `${width}rem` } )}>
            {displaySearch ? 
              <div id="listSearchTextBox">
                <div id="listSearchTextClose" onClick={handleSearchClick}>X</div>
                <input type="test" id="listSearchText" placeholder="검색할단체를 입력하세요" value={query} onChange={e => setQuery(e.target.value)}></input>
              </div> 
              :
              <div>검색</div>
            }
            </div>
            }
            </Motion>
            
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
              <div id="ListContentEntryLogoBox">
              <img
                id='ListContentEntryLogo'
                alt='NGO_logo'
                src={item.logo}
              />
              </div>
              <div id='ListContentEntryTitle'>{item.name}</div>
            </div>
            <div className='back'>
              <div id='ListContentEntryDescription'>{item.description}</div>
            </div>
          </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
}
</>
  );
}

export default withRouter(ListPage);
