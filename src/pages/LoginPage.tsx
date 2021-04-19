import { withRouter } from "react-router";
import "./css/LoginPage.css";
import {useSelector, useDispatch} from "react-redux"
import { doLogin } from "../action/index"
import { RootState } from "../reducers";

function LoginPage(props: any) {
  const state = useSelector((state: RootState) => state.loginReducer)
  const {loginInfo} = state;
  const dispatch = useDispatch();

  const handleStartBtnClick = () => {
    props.history.push('/test')
  }

  const handleLogoClick = () => {
    window.location.href = "./guide.html"
  }

  return (
    <div id='loginPageContainer'>
      <div id="loginTitle" onClick={handleLogoClick}>BINGO</div>
      <div id="loginMainBox" className="shadow">
        <h1>login to BINGO</h1>
        <div className="loginBtnBox shadow"
          onClick={() =>
            window.location.assign(
              `https://accounts.google.com/o/oauth2/auth?client_id=326989630973-ugi3107frqm09i3v730v26f2ivj27hkn.apps.googleusercontent.com&redirect_uri=https://localhost:3000/list&response_type=code&scope=profile&access_type=offline`
            )
          }
        >
        <div id="googleIcon"></div>
        <div className="loginLabel">구글 로그인</div>
        </div>
        <div className="loginBtnBox shadow"
          onClick={() =>
            window.location.assign(
              `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1f6fa43748f197dd179b4768a677578d&redirect_uri=https://localhost:3000/list`
            )
          }
        >
        <div id="kakaoIcon"></div>
        <div className="loginLabel">카카오 로그인</div>
        </div>
        <div className="loginBtnBox shadow" onClick={handleStartBtnClick}>
          <div className="loginLabel">비회원으로 시작하기</div>
        </div>
      </div>
      </div>
  );

}

export default withRouter(LoginPage);
