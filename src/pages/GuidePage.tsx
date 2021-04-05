import React, {useState} from "react";
import { withRouter } from "react-router";
import "./css/GuidePage.css";

function GuidePage() {
  const [text, setText] = useState("");
  function onChange(e: any){
    setText(e.target.value);
  }
  function onSubmit(e: any){
    e.preventDefault();
    setText("");
  }
  return (
  <div className="guidePageContainer">
    <h1>To Do</h1>
    <form onSubmit={onSubmit}>
      <input type="text" value={text} onChange={onChange}/>
      <button>Add</button>
    </form>
    <ul></ul>
  </div>)
}

export default withRouter(GuidePage);