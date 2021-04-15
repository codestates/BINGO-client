import "./css/ContentNewsList.css"
import ContentNewsListEntry from "./ContentNewsListEntry"
import axios from "axios";
import { useState } from 'react';
import { Motion, spring } from 'react-motion';

function ContentNewsList() {
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
  
  interface NewsData {
    title: string,
    originallink: string,
    link: string,
    description: string,
    pubDate: string
  }

  interface Response {
    lastBuildDate: string,
    total: number,
    start: number,
    display: number,
    items: [NewsData]
  }

  let newsData: [NewsData];


  axios.get("https://openapi.naver.com/v1/search/news.json?query=초록우산&display=2", {
    headers:{
      'X-Naver-Client-Id' : "",
      'X-Naver-Client-Secret': "",
    }
  })
  // fetch("https://openapi.naver.com/v1/search/news.json?query=보아&display=2", {
  //   method: 'GET',
  //   headers: {
  //     'X-Naver-Client-Id' : "HqssrkcezIYM9NmnWQHs",
  //     'X-Naver-Client-Secret': "2UMTPrP4Ua",
  //   }
  // })
  .then((res) => {
    console.log("결과!")
  })
  .catch((err) => console.log(err))

  return (
    <Motion style={{ top: spring(top), opacity: spring(opacity) }}>
    {
      ({ top, opacity }) => 
    <div id="contentNewsListContainer" style={Object.assign({}, {  }, { top, opacity } )}>
      <div className="contentBoxTitle">동물권행동 카라 관련 뉴스</div>
      <div className="contentBoxSubTitle">아래 뉴스 박스를 클릭하시면 뉴스 전문을 확인할 수 있습니다.</div>
      <div id="contentNewsListBox">
        <ContentNewsListEntry />
        <ContentNewsListEntry />
        <ContentNewsListEntry />
        <ContentNewsListEntry />
        </div>
    </div>
    }
    </Motion>
    
  )
}

export default ContentNewsList

