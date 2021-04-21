import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { showContent, showList } from "../action";
import { RootState } from "../reducers";
import store from "../store";
import "./css/ListContentEntry.css";

export default function ListContentEntry() {
  const state = useSelector((state: RootState) => state.listReducer);
  const dispatch = useDispatch();
  const [count, setCount] = useState(20); //페이지 랜더단체 갯수
  const [content, setContent] = useState([]); //페이지 랜더단체

  const handleContentListEntryClick = (ngoId: number) => {
    dispatch(showContent(ngoId));
  };

  const handleMoreBtnClick = () => {
    setCount(count + 20); //더보기 누를시 9개씩 추가랜더
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/listpage")
      .then(res => {
        console.log("check get list:", res.data.data);
        const lists = res.data.data;
        dispatch(showList(lists)); //받아온 데이터 리덕스에 저장
        setContent(lists); //받아온 데이터 리액트훅스에 저장
      })
      .catch(err => console.log("list_err:", err));
  }, []);

  store.subscribe(() => {
    let category = store.getState().listReducer.listInfoCategory.category; //현재 누른 카테고리
    let listAll = store.getState().listReducer.listInfo.data; //단체전부
    if(category === "전체") {
      setContent(listAll);
    } else {
      setContent(listAll.filter((item: any) => {
        return item.ngocategorys[0].category.name === category;
      }))
    }
  })

  return (
    <div id="listContentEntryWholeContainer">
    <div id='card'>
      {content.map((item: any, index) => {
        if(index < count) {
        return (
          <Link onClick={()=> handleContentListEntryClick(item.id)} to="/content">
          <div
            id='ListContentEntryContainer'
          >
            <div className='front'>
              <div id="ListContentEntryLogoBox">
              <img
                id='ListContentEntryLogo'
                alt='NgoLogo'
                src={item.logo}
              />
              </div>
            </div>
            <div className='listBackPart'>
                <div id='ListContentEntryDescription'>{item.name}</div>
                <div id='ListContentEntryDescription'>{item.since}</div>
              </div>
          </div>
          </Link>
        );
      }
      })}
      <div id="listContentShowMore" onClick={handleMoreBtnClick}>더보기</div>
    </div>
    </div>
  );
}
