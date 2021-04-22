import { useState } from "react";
import "./css/MyPageModal.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { showMypageModal } from "../action";
import { Link } from 'react-router-dom';
import axios from 'axios';

function MyPageModal() {

  const disptach = useDispatch();
  const state = useSelector((state: RootState) => state.mypageReducer);
  const userState = useSelector((state: RootState) => state.loginReducer);

  const handleClickClose = () => {
    disptach(showMypageModal(false, "", 0));
  }

  const stopSubcribe = () => {
    axios.patch("https://server.ibingo.link/donation", {
      accessToken: userState.userInfo.accessToken,
      donateId: state.myModalInfo.donateId,
      ing: 'false',
    })
    .then(handleClickClose)
    .then(() => window.location.href="/mypage")
    .catch(err => console.log(err))
    
  }

  return(
    <>
    {state.myModalInfo.modalDisplay ? (
      <div className="modalWholeContainer">
        <div className="modalContainer shadow">
          <div className="modalContentPart shadow">
            <div id="contentModalTitle">{`정말 ${state.myModalInfo.ngoName}의 정기후원을 해지하시겠습니까?`}</div>
            <div id="payModalSubtitle2">아래 버튼을 누르면 해당 단체에 대한 후원이 중단됩니다.</div>
            <div id="contentModalConfirmBtn" className="shadow" onClick={() => stopSubcribe()}>확인</div>
          </div>
          <div className="payPageModalCloseBtn shadow" onClick={handleClickClose}>X</div>
        </div>
      </div>
    ) : null}
    </>
  )
}

export default MyPageModal;