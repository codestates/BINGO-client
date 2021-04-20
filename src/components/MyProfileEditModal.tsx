import { useEffect, useState } from "react";
import "./css/MyProfileEditModal.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { showMyProfileEditModal } from "../action";
import { Link } from 'react-router-dom';
import axios from 'axios';

function MyProfileEditModal() {

  const disptach = useDispatch();
  const state = useSelector((state: RootState) => state.mypageReducer);
  const userState = useSelector((state: RootState) => state.loginReducer);
  const [imageSrc, setImageSrc] = useState(userState.userInfo.profileImage)

  const handleClickClose = () => {
    disptach(showMyProfileEditModal(false));
  }
  const readImage = (input) => {
    if(input.files && input.files[0]) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        setImageSrc(e.target.result)
      }
      reader.readAsDataURL(input.files[0])
    } 
  }
  const handleSubmitClick = () => {

    let inputImage: any = document.getElementById("myEditModalInputImage")
    let inputName: any = document.getElementById("myEditModalInputName")
    let file = inputImage.files[0]
    let alertMessageBox: any = document.getElementById("myEditModalAlertMessageBox")

    let userId = userState.userInfo.userId;
    let username = inputName.value ? inputName.value : userState.userInfo.username;
    let profileImage = file ? imageSrc : userState.userInfo.profileImage;

    console.log(userId, username, profileImage);
    console.log(file);

    if(file && file.size > 5 * 1024 * 1024){
      alertMessageBox.innerText = "파일 용량이 너무 크다능~"
    } else if (!inputImage.value && !inputName.value) {
      alertMessageBox.innerText = "변경한 정보가 없다능~"
    } else {
      axios.patch("http://localhost:5000/userinfo", {
        userId,
        username,
        profileImage,
      })
      .then(res => {
        alertMessageBox.innerText = "정보변경 완료됐다능"
      })
      .catch(err => {
        alertMessageBox.innerText = "에러 났다능~"
      })
    }
  }

  return(
    <>
    {state.myEditModalInfo.modalDisplay ? (
      <div className="modalWholeContainer">
        <div className="modalContainer shadow">
          <div className="modalContentPart shadow">
            <div style={{backgroundImage: `url(${imageSrc})`}} id="myEditModalPreview"/>
            <input type="file" id="myEditModalInputImage" onChange={(e) => readImage(e.target)} accept="image/*"/>
            <input type="text" id="myEditModalInputName" placeholder="변경할 유저네임을 입력해주세요"/>
            <div id="myEditModalAlertMessageBox">변경할 프로필사진을 업로드하고, <br/>변경할 유저네임을 입력해주세요</div>
            <button id="myEditModalSubmitButton" onClick={handleSubmitClick}>확인</button>
          </div>
          <div className="payPageModalCloseBtn shadow" onClick={handleClickClose}>X</div>
        </div>
      </div>
    ) : null}
    </>
  )
}

export default MyProfileEditModal;