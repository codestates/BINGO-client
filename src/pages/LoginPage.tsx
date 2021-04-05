import { withRouter } from "react-router";
import "./css/LoginPage.css";

function LoginPage() {
  return (<div className="loginPageContainer">로그인페이지
  <button>카카오로그인</button>
  <button>구글로그인</button>
  </div>)
}

export default withRouter(LoginPage);