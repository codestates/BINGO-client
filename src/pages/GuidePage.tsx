import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import { useRef } from "react";
import "./css/GuidePage.css";

function GuidePage() {
  const history = useHistory();

  let yOffset = 0;
  let prevScrollHeight = 0;
  let currentScene = 0;

  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.getElementById('scroll-section-0')!
      }
    },
    {
      // 1
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.getElementById('scroll-section-1')!
      }
    },
    {
      // 2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.getElementById('scroll-section-2')!
      }
    },
    {
      // 3
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.getElementById('scroll-section-3')!
      }
    },
    {
      // 4
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.getElementById('scroll-section-4')!
      }
    },
  ];

  function setLayout() {
    for(let i = 0; i < sceneInfo.length; i++){
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      if(sceneInfo[i].objs.container){
        sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
      }
    }
  }

  function scrollLoop(){
    prevScrollHeight = 0;
    for(let i = 0; i < currentScene; i++){
      prevScrollHeight += sceneInfo[i].scrollHeight; 
    }
    if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
      currentScene++;
    }
    if(yOffset < prevScrollHeight){
      // if(currentScene === 0) return
      currentScene--;
    }
    console.log(currentScene);
    let guidePageContainer = document.querySelector(".guidePageContainer")!;
    guidePageContainer.setAttribute('id', `show-scene-${currentScene}`)
  }

  window.addEventListener('resize', setLayout);
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  setLayout();
  console.log(sceneInfo[0].objs.container);
  console.log(document.getElementById('scroll-section-2'));

  return (

  <div className="guidePageContainer">
    <button onClick={() => {history.push('/login')}}>로그인</button>
	<div className="container">
    <section className="scroll-section" id="scroll-section-0">
      <h1>B I N G O</h1>
      <div className="sticky-elem main-message">
        <p>사회단체 후원 활동에<br/>재미와 편리함을 더하다</p>
        </div>
        <div className="sticky-elem main-message">
        <p>맞춤형 온라인<br />기부 플랫폼</p>
        </div>
        <div className="sticky-elem main-message">
        <p>BINGO에서<br />사회적 가치를 구입하고,</p>
        </div>
        <div className="sticky-elem main-message">
        <p>당신의 삶에<br/>빙고를 완성하세요</p>
        </div>
    </section>
    <section className="scroll-section" id="scroll-section-1">
      <div className="sticky-elem main-message">
        <p>단 10개의 질문에 답하세요</p>
        </div>
        <div className="sticky-elem main-message">
        <p>BINGO가 당신의 후원을 기다리는<br/>사회단체를 추천해드립니다</p>
        </div>
    </section>
    <section className="scroll-section" id="scroll-section-2">
    <div className="sticky-elem main-message">
        <p>단 하나의 페이지에서<br/>당신의 모든 후원활동을 관리하세요</p>
        </div>
    <div className="sticky-elem main-message">
        <p>여러 단체 후원도 한 번에</p>
        </div>
    <div className="sticky-elem main-message">
        <p>정기후원 해지도<br/>BINGO에서 간편하게</p>
        </div>
    </section>
    <section className="scroll-section" id="scroll-section-3">
    <div className="sticky-elem main-message">
        <p>가장 많이 후원한 단체,<br/>가장 오래 후원한 단체</p>
        </div>
        <div className="sticky-elem main-message">
        <p>나의 후원 경향</p>
        </div>
        <div className="sticky-elem main-message">
        <p>당신의 후원 패턴을<br/>BINGO가 분석해드립니다</p>
        </div>
    </section>
    <section className="scroll-section" id="scroll-section-4">
      <p className="mid-message">
        Bring In NGO to your life<br/>
        BINGO to your life
      </p>
      <p className="canvas-caption">Lorem ipsum dolor sit amet consectetur, adipisicing elit. In voluptatem laborum quo. Reprehenderit fugit perspiciatis voluptatem nostrum odio libero accusantium eius, omnis dolor voluptatibus impedit culpa ratione, quasi ipsum placeat corporis sapiente, cum dignissimos! Laboriosam eius similique non earum nisi? Quam quasi dolore, itaque atque officia facilis quas labore dignissimos numquam suscipit nisi veniam eius deserunt praesentium aperiam assumenda dolorum sequi vel earum necessitatibus at ad facere totam. Debitis possimus nihil adipisci doloremque, fugiat minima repellat dolor facilis temporibus, vero ratione, voluptatem quas blanditiis ducimus delectus? Est non animi quidem delectus assumenda error, aliquam quo ad dolores doloremque ducimus debitis culpa iusto omnis nulla quae earum harum illum repellat quis blanditiis quas! Nostrum aperiam quisquam autem porro commodi suscipit excepturi nam inventore, id tenetur atque reprehenderit, doloribus soluta animi fuga earum eligendi, eaque maxime officia. Rem eius dolorem, ab recusandae consectetur eveniet hic sequi quam nemo? Saepe, vel error modi maiores necessitatibus impedit accusamus quaerat esse adipisci, dolor a nisi inventore cum officia totam nobis harum! Adipisci, voluptatibus illum? Exercitationem, animi. Nostrum, similique nam. Commodi laborum est quia odit labore aliquid consectetur voluptates ea recusandae? Laudantium dolor quasi explicabo voluptas libero nihil, enim asperiores, eius sit aliquam expedita praesentium. Vel.</p>
    </section>
		<footer className="footer">
			C o d e F a r m
		</footer>
  </div>
  </div>)
}

export default withRouter(GuidePage);
