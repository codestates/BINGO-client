import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import "./css/ListContentEntry.css";

export default function ListContentEntry() {
  const handleContentListEntryClick = () => {
    window.location.href = "./content";
  };
  const state = useSelector((state: RootState) => state.listReducer);
  // const [ngolist, setNgoList] = useState("");
  // let lists;

  // const lists = [
  //   { logo: "example1", title: "name1", description: " null" },
  //   { logo: "example2", title: "name2", description: " null" },
  //   { logo: "example1", title: "name1", description: " null" },
  //   { logo: "example2", title: "name2", description: " null" },
  //   { logo: "example1", title: "name1", description: " null" },
  // ];
  // console.log("check_list:", lists);
  

  return (
    <div className='card'>
      {state.listInfo.data.map((item: any) => {
        return (
          <div
            id='ListContentEntryContainer'
            className='shadow'
            onClick={handleContentListEntryClick}
          >
            <div className='front'>
              <img id='ListContentEntryLogo' alt='NGO_logo' src={item.logo} />
              <div id='ListContentEntryTitle'>{item.name}</div>
            </div>
            <div className='back'>
              <div id='ListContentEntryDescription'>{item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
