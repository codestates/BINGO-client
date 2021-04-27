import "./css/ContentMessageListEntry.css"

interface ContentMessageProps {
  user: {username: string, propfileImage: string},
  message: string
}

function ContentMessageListEntry(props: ContentMessageProps) {
  return (
  <div id="contentMessageListEntryContainer" className="shadow">
    <div id="contentMessageImgAndName">
      <img src="https://i.imgur.com/FP3hraO.png" alt="profile_img" />
      <div id="contentMessageName">{props.user.username}</div>
    </div>
    <p id="contentMessageMessage">{props.message}</p>
  </div>
  )
}

export default ContentMessageListEntry