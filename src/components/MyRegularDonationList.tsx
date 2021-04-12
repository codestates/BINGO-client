import React from "react";
import "./css/MyRegularDonationList.css";
import MyRegularDonationListEntry from "./MyRegularDonationListEntry"

function MyRegularDonationList(){
  return (
  <div id="myRegularDonationListContainer">
    <div className="myPageTitle">현재 후원 중인 단체</div>
    <div id="regularDonationBox">
    <MyRegularDonationListEntry />
    <MyRegularDonationListEntry />
    <MyRegularDonationListEntry />
    </div>
  </div>
  )
}

export default MyRegularDonationList;