import { useState } from "react";
import "./css/PayPageModal.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { showPayModal, showPostMessage } from "../action"

function PayPageModal() {

  const disptach = useDispatch();

  const state = useSelector((state: RootState) => state.payReducer);

  const handleClickClose = () => {
    disptach(showPayModal(false, state.payModalInfo.money));
  }

  const handleClickConfirm = () => {
    disptach(showPayModal(false, state.payModalInfo.money));
    disptach(showPostMessage(false));
  }

  return(
    <>
    {state.payModalInfo.modalDisplay ? (
      <div className="modalWholeContainer">
        <div className="modalContainer shadow">
          <div className="modalContentPart shadow">
            <div id="payModalTitle" className="shadow">결제하시겠습니까?</div>
            <div id="payModalSubtitle">총금액: {state.payModalInfo.money} ₩</div>
            <div id="payModalSubtitle2">아래버튼을 누를시 다음 단계로 이동합니다</div>
            <div id="payModalConfirmBtn" className="shadow" onClick={handleClickConfirm}>확인</div>
          </div>
          <div className="payPageModalCloseBtn shadow" onClick={handleClickClose}><i className='fas fa-times'/></div>
        </div>
      </div>
    ) : null}
    </>
  )
}

export default PayPageModal;