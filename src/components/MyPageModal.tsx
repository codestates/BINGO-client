import { useState } from "react";
import "./css/MyPageModal.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { showMypageModal } from "../action";

function MyPageModal() {

  const disptach = useDispatch();
  const state = useSelector((state: RootState) => state.mypageReducer);

  const handleClickClose = () => {
    disptach(showMypageModal(false));
  }

  const handleRedirectClick = () => {
    window.location.href = "./pay"
  }

  return(
    <>
    {state.myModalInfo.modalDisplay ? (
      <div className="modalWholeContainer">
        <div className="modalContainer shadow">
          <div className="modalContentPart shadow">
            <div id="contentModalTitle">{`단체가 MINJE님의 후원결제리스트에 담겼습니다`}</div>
            <div id="payModalSubtitle2"> 누를시 페이페이지로 이동합니다</div>
            <div id="contentModalConfirmBtn" className="shadow" onClick={handleRedirectClick}>이동</div>
          </div>
          <div className="payPageModalCloseBtn shadow" onClick={handleClickClose}>X</div>
        </div>
      </div>
    ) : null}
    </>
  )
}

export default MyPageModal;