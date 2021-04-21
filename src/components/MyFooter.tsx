import "./css/MyFooter.css";
import { useSpring, animated } from "react-spring";
import { useState } from 'react';

function MyFooter(){
  const [key, setKey] = useState(1);
  const [pause, setPause] = useState(false);
  
  const scrolling = useSpring({
    from: { transform: "translate(99%,0)" },
    to: { transform: "translate(-99%,0)" },
    config: { duration: 10000 },
    pause,
    loop: true
  });

  return (
    <div id="myFooterContainer">
      <div id="footerContent">
        <div id="codeFarm">CodeFarm</div>
        <div id="github" onMouseOver={()=> setPause(true)} onMouseLeave={()=> setPause(false)}>
          <div id="address">
            <animated.div style={scrolling}>
              JAEYEONG SUNG&emsp;<a href="https://github.com/Sungjaeyeong">Move to GitHub</a>&emsp;&emsp;
              MINJE SHIN&emsp;<a href="https://github.com/tlsalswp1004">Move to GitHub</a>&emsp;&emsp;
              JAKYEONG YANG&emsp;<a href="https://github.com/louis220">Move to GitHub</a>&emsp;&emsp;
              JUNGHO CHOI&emsp;<a href="https://github.com/9rganizedchaos">Move to GitHub</a>
            </animated.div>
        </div>
        </div>
        <div id="logo">B I N G O</div>
      </div>
    </div>
  )
}

export default MyFooter;