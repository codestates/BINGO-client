import { withRouter } from "react-router";
import "./css/LoginPage.css";

function LoginPage() {
  return (<div className="loginPageContainer">로그인페이지
  <button onClick={() => window.location.assign(
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=d9775f812715a7d598f47d0e44c1cd2f&redirect_uri=https://localhost:3000`
  )}>카카오로그인</button>
  <button onClick={()=>window.location.assign(
    `https://accounts.google.com/o/oauth2/auth?client_id=326989630973-ugi3107frqm09i3v730v26f2ivj27hkn.apps.googleusercontent.com&redirect_uri=https://localhost:3000&response_type=code&scope=profile`)}>구글로그인</button>
  </div>)
}

export default withRouter(LoginPage);