import { useState } from "react";
import "./css/ContentPageModal.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { showPayModal, showPostMessage } from "../action"

function ContentPageModal() {

  const disptach = useDispatch();

  const state = useSelector((state: RootState) => state.payReducer);

  const handleClickClose = () => {
    disptach(showPayModal(false));
  }

  const handleClickConfirm = () => {
    disptach(showPayModal(false));
    disptach(showPostMessage(false));
  }

  return(
    <>
    {state.payModalInfo.modalDisplay ? (
      <div id="payPageModalWholeContainer">
        <div id="payPageModalContainer" className="shadow">
          <div id="payPageModalContentPart" className="shadow">
            <div id="payModalTitle">결제하시겠습니까?</div>
            <div id="payModalSubtitle">총금액: 40,000 ₩</div>
            <div id="payModalSubtitle2">아래버튼을 누를시 pay_pal 페이지로 이동합니다</div>
            <div id="payModalConfirmBtn" className="shadow" onClick={handleClickConfirm}>확인</div>
          </div>
          <div className="payPageModalCloseBtn shadow" onClick={handleClickClose}>X</div>
        </div>
      </div>
    ) : null}
    </>
  )
}

export default ContentPageModal;