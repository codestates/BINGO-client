import "./css/MyRegularDonationListEntry.css";

function MyRegularDonationListEntry(){
  return (
  <div id="myRegularDonationListEntryContainer" className="shadow">
    <div>
      <div id="myRegularDonationNGO">동물권행동 카라</div>
      <div id="myRegularDonationPrice">10000원</div>
    </div>
    <button>정기후원 해지</button>
  </div>
  )
}

export default MyRegularDonationListEntry;