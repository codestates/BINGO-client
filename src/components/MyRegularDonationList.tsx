import React from "react";
import "./css/MyRegularDonationList.css";
import MyRegularDonationListEntry from "./MyRegularDonationListEntry"

function MyRegularDonationList(){
  return (
  <div id="myRegularDonationListContainer">
    <div className="myPageTitle">현재 정기후원 중인 단체</div>
    <div className="myPageSubTitle">우측 해지버튼을 통해 정기후원을 간편하게 취소하실 수 있습니다.</div>
    <div id="regularDonationBox">
    <MyRegularDonationListEntry />
    <MyRegularDonationListEntry />
    <MyRegularDonationListEntry />
    </div>
  </div>
  )
}

export default MyRegularDonationList;