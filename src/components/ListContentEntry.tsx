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
  // let lists;

  // const lists = [
  //   { logo: "example1", title: "name1", description: " null" },
  //   { logo: "example2", title: "name2", description: " null" },
  //   { logo: "example1", title: "name1", description: " null" },
  //   { logo: "example2", title: "name2", description: " null" },
  //   { logo: "example1", title: "name1", description: " null" },
  // ];
  // console.log("check_list:", lists);
  useEffect(() => {
    axios
      .get("http://localhost:5000/listpage")
      .then(res => {
        console.log("check get list:", res.data.data);
        const lists = res.data.data;

        dispatch(showList(lists));
      })
      .catch(err => console.log("list_err:", err));
    // dispatch(showList(lists));
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
              <img id='ListContentEntryLogo' alt='NGO_logo' src={item.logo} />
              <div id='ListContentEntryTitle'>{item.name}</div>
            </div>
            <div className='back'>
              <div id='ListContentEntryDescription'>{item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
