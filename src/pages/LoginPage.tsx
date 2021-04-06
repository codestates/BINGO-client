import { withRouter } from "react-router";
import "./css/LoginPage.css";


function LoginPage() {

  const kakaoLoginHandler = () => {
    window.location.assign('https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=a7fac194ba87a5958cc6f94e2c2a9cf7&redirect_uri=http://localhost:3000/oauth')
  }

  return (<div className="loginPageContainer">로그인페이지
  <button onClick={kakaoLoginHandler}>카카오로그인</button>
  <button>구글로그인</button>
  </div>)
}

export default withRouter(LoginPage);