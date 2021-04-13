import "./css/ContentNewsList.css"
import ContentNewsListEntry from "./ContentNewsListEntry"

function ContentNewsList() {
  
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

  fetch("https://openapi.naver.com/v1/search/news.json?query=보아&display=2", {
    method: 'GET',
    headers: {
      'X-Naver-Client-Id' : "",
      'X-Naver-Client-Secret': "",
    }
  })
  .then((res) => {
    console.log("결과!")
  })
  .catch((err) => console.log("에러"))

  return (
    <div id="contentNewsListContainer">
      <div className="contentBoxTitle">동물권행동 카라 관련 뉴스</div>
      <div className="contentBoxSubTitle">아래 뉴스 박스를 클릭하시면 뉴스 전문을 확인할 수 있습니다.</div>
      <div id="contentNewsListBox">
        <ContentNewsListEntry />
        <ContentNewsListEntry />
        <ContentNewsListEntry />
        <ContentNewsListEntry />
        </div>
    </div>
  )
}

export default ContentNewsList

