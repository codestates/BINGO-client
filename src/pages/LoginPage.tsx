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

  const parallax = (e: any) => {
    let layerArr = Array.from(document.getElementsByClassName("layer") as HTMLCollectionOf<HTMLElement>)
    layerArr.forEach((layer) => {
      const speed = layer.getAttribute("data-speed")

      const x = (window.innerWidth - e.pageX * Number(speed)) / 100;
      const y = (window.innerHeight - e.pageY * Number(speed)) / 100;

      layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    })
  }

  document.addEventListener("mousemove", parallax);
  // function parallax(e) {
  //   document.querySelectorAll(".layer").forEach((layer) => {
  //     const speed = layer.getAttribute("data-speed");

  //     const x = (window.innerWidth - e.pageX * speed) / 100;
  //     const y = (window.innerHeight - e.pageY * speed) / 100;

  //     layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
  //   });
  // }

  return (
    <div id='loginPageContainer'>
      <div id="loginTitle" onClick={handleLogoClick}>B I N G O</div>
      <div id="loginMainBox" className="shadow">
        <h1>login to BINGO</h1>
        <div className="loginBtnBox shadow"
          onClick={() =>
            window.location.assign(
              `https://accounts.google.com/o/oauth2/auth?client_id=326989630973-ugi3107frqm09i3v730v26f2ivj27hkn.apps.googleusercontent.com&redirect_uri=https://ibingo.link/list&response_type=code&scope=profile&access_type=offline`
            )
          }
        >
          <div id="googleIcon"></div>
          <div className="loginLabel">구글 로그인</div>
        </div>
        <div className="loginBtnBox shadow"
          onClick={() =>
            window.location.assign(
              `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1f6fa43748f197dd179b4768a677578d&redirect_uri=https://ibingo.link/list`
            )
          }
        >
        <div id="kakaoIcon"></div>
        <div className="loginLabel">카카오 로그인</div>
        </div>
        <div className="loginBtnBox shadow" onClick={handleStartBtnClick}>
          <div className="loginLabel">비회원으로 시작하기</div>
        </div>
        <p id="loginDescription">비회원 시작의 경우, 테스트 유저로 로그인됩니다</p>
      </div>
      <div className="layer small full a" data-speed="3"/>
      <div className="layer medium empty b" data-speed="5"/>
      <div className="layer large full c" data-speed="8"/>
      <div className="layer small full d" data-speed="3"/>
      <div className="layer medium empty e" data-speed="5"/>
      <div className="layer large full f" data-speed="8"/>
      <div className="layer small empty g" data-speed="3"/>
      <div className="layer medium empty h" data-speed="5"/>
      <div className="layer medium full i" data-speed="5"/>
      <div className="layer small empty j" data-speed="3"/>
      <div className="layer medium full k" data-speed="5"/>
      <div className="layer large full l" data-speed="8"/>
      <div className="layer medium empty m" data-speed="5"/>
      <div className="layer medium full n" data-speed="5"/>
      <div className="layer large empty o" data-speed="8"/>
      <div className="layer medium empty p" data-speed="5"/>
      <div className="layer small full q" data-speed="3"/>
      <div className="layer large empty r" data-speed="8"/>
      <div className="layer large full s" data-speed="8"/>
      <div className="layer small full t" data-speed="3"/>
      <div className="layer medium empty u" data-speed="5"/>
      <div className="layer small empty v" data-speed="3"/>
      <div className="layer medium full w" data-speed="5"/>
      <div className="layer large empty x" data-speed="8"/>
    </div>
  );

}

export default withRouter(LoginPage);
