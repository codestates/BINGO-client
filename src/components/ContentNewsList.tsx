import "./css/ContentNewsList.css"
import ContentNewsListEntry from "./ContentNewsListEntry"
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { useState } from 'react';
import { Motion, spring } from 'react-motion';

interface ContentNewsListProps {
  ngoName: string
}

function ContentNewsList(props: ContentNewsListProps ) {
  const state = useSelector((state: RootState) => state.contentReducer);
  const { currentNewsList } = state;

  const [top, setTop] = useState(150);
  const [opacity, setOpacity] = useState(0);

  document.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop > 0) {
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
    <div id="contentNewsListContainer" style={Object.assign({}, {  }, { top, opacity } )}>
      <div className="contentBoxTitle">{`${props.ngoName} 관련 뉴스`}</div>
      <div className="contentBoxSubTitle">아래 뉴스 박스를 클릭하시면 뉴스 전문을 확인할 수 있습니다.</div>
      <div id="contentNewsListBox">
        {currentNewsList.newsList.map(item => { 
          return (
          <ContentNewsListEntry key={item.link} newsTitle={item.title} newsLink={item.originallink} newsDesc={item.description}/>
        )
        })}
        </div>
    </div>
    }
    </Motion>
    
  )
}

export default ContentNewsList