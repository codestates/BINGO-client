import "./css/ContentNewsList.css"
import ContentNewsListEntry from "./ContentNewsListEntry"
import axios from "axios";
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

interface ContentNewsListProps {
  ngoName: string
}

function ContentNewsList(props: ContentNewsListProps ) {
  const state = useSelector((state: RootState) => state.contentReducer);
  const { currentNewsList } = state;
  console.log(currentNewsList);

  return (
    <div id="contentNewsListContainer">
      <div className="contentBoxTitle">{`${props.ngoName} 관련 뉴스`}</div>
      <div className="contentBoxSubTitle">아래 뉴스 박스를 클릭하시면 뉴스 전문을 확인할 수 있습니다.</div>
      <div id="contentNewsListBox">
        {currentNewsList.newsList.map(item => { 
          return (
          <ContentNewsListEntry key={item.link} newsTitle={item.title} newsLink={item.originallink} newsDesc={item.description}/>
        )
        })}
        </div>
    </div>
  )
}

export default ContentNewsList

