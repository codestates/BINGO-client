import "./css/ContentNewsList.css"
import ContentNewsListEntry from "./ContentNewsListEntry"

function ContentNewsList() {
  return (
    <div id="contentMessageListContainer">
      <div className="contentBoxTitle">동물권행동 카라 관련 뉴스</div>
      <ContentNewsListEntry />
      <ContentNewsListEntry />
      <ContentNewsListEntry />
    </div>
  )
}

export default ContentNewsList

