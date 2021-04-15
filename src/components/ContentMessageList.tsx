import "./css/ContentMessageList.css"
import ContentMessageListEntry from "./ContentMessageListEntry"
import { useState } from 'react';
import { Motion, spring } from 'react-motion';

function ContentMessageList() {
  const [top, setTop] = useState(150);
  const [opacity, setOpacity] = useState(0);

  document.addEventListener('scroll', function() {
    console.log(document.documentElement.scrollTop)
    if (document.documentElement.scrollTop > 470) {
      setTop(0);
      setOpacity(1);
    } else {
      setTop(150);
      setOpacity(0);
    }
  });

  return (
    <Motion style={{ top: spring(top), opacity: spring(opacity) }}>
    {
      ({ top, opacity }) => 
    <div id="contentMessageListContainer" style={Object.assign({}, {  }, { top, opacity } )}>
      <div className="contentBoxTitle">후원회원들의 응원메시지</div>
      <div className="contentBoxSubTitle">동물권행동 카라를 후원한 회원들이 직접 남긴 메시지입니다.</div>
      <div id="contentMessageListBox">
      <ContentMessageListEntry />
      <ContentMessageListEntry />
      <ContentMessageListEntry />
      </div>
    </div>
    }
    </Motion>
  )
}

export default ContentMessageList