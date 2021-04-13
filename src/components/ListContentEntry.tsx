import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import "./css/ListContentEntry.css";

export default function ListContentEntry() {
  const handleContentListEntryClick = () => {
    window.location.href = "./content";
  };
  const state = useSelector((state: RootState) => state.listReducer);
  const dispatch = useDispatch();
  const [ngolist, setNgoList] = useState("");
  axios.get("https://localhost:3000/listpage", {}).then(res => {
    const lists = res.data; //수정필요
    dispatch(setNgoList(lists));
  });
  return (
    <div className='card'>
      <div
        id='ListContentEntryContainer'
        className='shadow'
        onClick={handleContentListEntryClick}
      >
        <div className='front'>
          <img id='ListContentEntryLogo' alt='NGO_logo' src='' />
          <div id='ListContentEntryTitle'>동물권행동 카라</div>
          <div id='ListContentEntryDescription'>89명의 회원이 후원중</div>
        </div>
        <div className='back'>
          <div>description</div>
        </div>
      </div>
    </div>
  );
}
