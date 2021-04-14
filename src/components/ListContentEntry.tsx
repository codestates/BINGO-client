import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showList } from "../action";
import { RootState } from "../reducers";
import "./css/ListContentEntry.css";

export default function ListContentEntry() {
  const handleContentListEntryClick = () => {
    window.location.href = "./content";
  };
  const state = useSelector((state: RootState) => state.listReducer);
  const dispatch = useDispatch();
  // const [ngolist, setNgoList] = useState("");
  // axios.get("https://localhost:3000/listpage", {}).then(res => {
  //   const lists = res.data; //수정필요
  //   dispatch(showList(lists));
  // });
  const lists = [
    { logo: "example1", title: "name1", description: " null" },
    { logo: "example2", title: "name2", description: " null" },
    { logo: "example1", title: "name1", description: " null" },
    { logo: "example2", title: "name2", description: " null" },
    { logo: "example1", title: "name1", description: " null" },
  ];
  useEffect(() => {
    dispatch(showList(lists));
    console.log("state_check:", state.listInfo.data);
  }, []);

  return (
    <div className='card'>
      {state.listInfo.data.map((item: any) => {
        return (
          <div
            id='ListContentEntryContainer'
            className='shadow'
            onClick={handleContentListEntryClick}
          >
            <div className='front'>
              <img id='ListContentEntryLogo' alt='NGO_logo' src='' />
              <div id='ListContentEntryTitle'>{item.title}</div>
              <div id='ListContentEntryDescription'>{item.description}</div>
            </div>
            <div className='back'>
              <div>description</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
