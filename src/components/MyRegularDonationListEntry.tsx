import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import "./css/MyRegularDonationListEntry.css";
import { showMypageModal } from "../action"
import axios from 'axios';

interface MyRegularProps{
  money: number;
  ngoName: string;
  donateId: number;
}

function MyRegularDonationListEntry(props: MyRegularProps){
  const state = useSelector((state: RootState) => state.contentReducer);
  const dispatch = useDispatch();

  const handleSupportCancelClick = () => {
    dispatch(showMypageModal(true));
    axios.patch("http://localhost:5000/donation", {
      donateId: props.donateId,
      ing: 'false',
    })
  }

  return (
  <div id="myRegularDonationListEntryContainer" className="shadow">
    <div>
      <div id="myRegularDonationNGO">{props.ngoName}</div>
      <div id="myRegularDonationPrice">{`${props.money}원`}</div>
    </div>
    <button onClick={() => handleSupportCancelClick()}>정기후원 해지</button>
  </div>
  )
}

export default MyRegularDonationListEntry;