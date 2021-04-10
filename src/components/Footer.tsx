import "./css/Footer.css";

function Footer(){
  return (
    <div id="footerContainer">푸터
    <button onClick={() => window.location.href = "https://localhost:3000/guide.html"}>가이드페이지로 이동</button>
    </div>
  )
}

export default Footer;