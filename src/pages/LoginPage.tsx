import { withRouter } from "react-router";
import "./css/LoginPage.css";
import {useSelector, useDispatch} from "react-redux"
import { doLogin } from "../action/index"

function LoginPage() {
  const state = useSelector((state) => state.loginReducer)
  const {loginInfo} = state;
  const dispatch = useDispatch();

  const handleClick = (param: string) => {
    dispatch(doLogin(param));
  }

  return (
    <div className='loginPageContainer'>
      로그인페이지
      <button
        onClick={() =>
          window.location.assign(
            `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1f6fa43748f197dd179b4768a677578d&redirect_uri=https://localhost:3000/guide.html`
          )
        }
      >
        카카오로그인
      </button>
      <button
        onClick={() =>
          window.location.assign(
            `https://accounts.google.com/o/oauth2/auth?client_id=326989630973-ugi3107frqm09i3v730v26f2ivj27hkn.apps.googleusercontent.com&redirect_uri=https://localhost:3000/guide.html&response_type=code&scope=profile&access_type=offline`
          )
        }
      >
        구글로그인
      </button>
      <div>{loginInfo.accessToken}</div>
      <button onClick={() => handleClick("상태바뀜")}>상태 바껴라 얍!</button>
    </div>
  );

}

export default withRouter(LoginPage);
