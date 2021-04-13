import "./css/ContentMessageListEntry.css"

function ContentMessageListEntry() {
  return (
  <div id="contentMessageListEntryContainer" className="shadow">
    <div id="contentMessageImgAndName">
      <img src="https://i.imgur.com/FP3hraO.png" alt="profile_img" />
      <div id="contentMessageName">김코딩</div>
    </div>
    <p id="contentMessageMessage">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo atque magnam nam. Ex aspernatur odit ab numquam ad! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo atque magnam nam. Ex aspernatur odit ab numquam ad!</p>
  </div>
  )
}

export default ContentMessageListEntry