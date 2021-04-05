import { withRouter } from "react-router";
import "./css/TestPage.css";

function TestPage() {
  return (<div className="testPageContainer">테스트페이지</div>)
}

export default withRouter(TestPage);