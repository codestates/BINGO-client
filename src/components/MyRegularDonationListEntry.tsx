import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import "./css/MyRegularDonationListEntry.css";
import { showMypageModal } from "../action"

interface MyRegularProps{
  money: number
  ngoName: string
}

function MyRegularDonationListEntry(props: MyRegularProps){
  const state = useSelector((state: RootState) => state.contentReducer);
  const dispatch = useDispatch();

  const handleSupportCancelClick = () => {
    dispatch(showMypageModal(true));
    console.log("정기후원 해지버튼 클릭")
  }

  return (
  <div id="myRegularDonationListEntryContainer" className="shadow">
    <div>
      <div id="myRegularDonationNGO">{props.ngoName}</div>
      <div id="myRegularDonationPrice">{`${props.money}원`}</div>
    </div>
    <button onClick={handleSupportCancelClick}>정기후원 해지</button>
  </div>
  )
}

export default MyRegularDonationListEntry;