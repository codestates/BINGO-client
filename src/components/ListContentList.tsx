import { useEffect, useState } from "react";
import store from "../store";
import ListContentEntry from "./ListContentEntry";
import "./css/ListContentList.css";
import { Motion, spring } from 'react-motion';

export default function ListContentList() {
  const [category, setCategory] = useState(0);
  const [top, setTop] = useState(150);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTop(0);
    setOpacity(1);
  })

  return (
    <Motion style={{ top: spring(top), opacity: spring(opacity) }}>
    {
      ({ top, opacity }) => 
        <div id='listContentListContainer' style={Object.assign({}, {  }, { top, opacity } )}>
          <ListContentEntry />
        </div>
    }
    </Motion>
  );
}
