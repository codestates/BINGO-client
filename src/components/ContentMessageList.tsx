import "./css/ContentMessageList.css"
import ContentMessageListEntry from "./ContentMessageListEntry"

function ContentMessageList() {
  return (
    <div id="contentMessageListContainer">
      <div className="contentBoxTitle">후원회원들의 응원메시지</div>
      <div id="contentMessageListBox">
      <ContentMessageListEntry />
      <ContentMessageListEntry />
      <ContentMessageListEntry />
      <ContentMessageListEntry />
      <ContentMessageListEntry />
      <ContentMessageListEntry />
      </div>
    </div>
  )
}

export default ContentMessageList