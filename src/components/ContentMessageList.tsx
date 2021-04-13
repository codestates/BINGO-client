import "./css/ContentMessageList.css"
import ContentMessageListEntry from "./ContentMessageListEntry"

function ContentMessageList() {
  return (
    <div id="contentMessageListContainer">
      <div className="contentBoxTitle">후원회원들의 응원메시지</div>
      <div className="contentBoxSubTitle">동물권행동 카라를 후원한 회원들이 직접 남긴 메시지입니다.</div>
      <div id="contentMessageListBox">
      <ContentMessageListEntry />
      <ContentMessageListEntry />
      <ContentMessageListEntry />
      </div>
    </div>
  )
}

export default ContentMessageList