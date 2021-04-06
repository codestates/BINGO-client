import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import "./css/GuidePage.css";

function GuidePage() {
  const history = useHistory();

  return (
    <div className='guidePageContainer'>
      <button onClick={() => history.push("/login")}>로그인</button>
    </div>
  );
}

export default withRouter(GuidePage);
