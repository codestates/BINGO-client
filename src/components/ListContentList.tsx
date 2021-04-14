import { useEffect, useState } from "react";
import store from "../store";
import ListContentEntry from "./ListContentEntry";
import "./css/ListContentList.css";

export default function ListContentList() {
  const [category, setCategory] = useState(0);
  return (
    <div id='listContentListContainer'>
      <ListContentEntry />
    </div>
  );
}
