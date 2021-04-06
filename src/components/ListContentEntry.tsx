import { useEffect, useState } from "react"
import store from "../store";

export default function ListContentEntry() {

  const [category, setCategory] = useState(0);
  return(
    <div id="listContentPart">
      <div className="listContent">{}</div>
      <div className="listContent">content2</div>
      <div className="listContent">content3</div>
      <div className="listContent">content4</div>
    </div>
  )
}