import "./css/ListContentEntry.css";

export default function ListContentEntry() {
  const handleContentListEntryClick = () => {
    window.location.href = "./content"
  }
  return(
  <div id="ListContentEntryContainer" className="shadow" onClick={handleContentListEntryClick}>
    <img id="ListContentEntryLogo" alt="NGO_logo" src="" />
    <div id="ListContentEntryTitle">동물권행동 카라</div>
    <div id="ListContentEntryDescription">89명의 회원이 후원중</div>
  </div>
  )
}