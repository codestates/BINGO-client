import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import "./css/MyRegularDonationListEntry.css";
import { showMypageModal } from "../action"

interface MyRegularProps{
  money: number;
  ngoName: string;
  donateId: number;
}

function MyRegularDonationListEntry(props: MyRegularProps){
  const state = useSelector((state: RootState) => state.contentReducer);
  const dispatch = useDispatch();

  return (
  <div id="myRegularDonationListEntryContainer" className="shadow">
    <div>
      <div id="myRegularDonationNGO">{props.ngoName}</div>
      <div id="myRegularDonationPrice">{`${props.money}원`}</div>
    </div>
    <button onClick={() => dispatch(showMypageModal(true, props.ngoName, props.donateId)) }>정기후원 해지</button>
  </div>
  )
}

export default MyRegularDonationListEntry;