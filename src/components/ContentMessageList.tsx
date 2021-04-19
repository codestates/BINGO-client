import "./css/ContentMessageList.css";
import ContentMessageListEntry from "./ContentMessageListEntry";
import { useState } from "react";
import { Motion, spring } from "react-motion";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

interface ContentMessageListProps {
  ngoName: string;
}

function ContentMessageList(props: ContentMessageListProps) {
  const state = useSelector((state: RootState) => state.contentReducer);
  const { currentMessageList } = state;
  console.log(currentMessageList);

  const [top, setTop] = useState(150);
  const [opacity, setOpacity] = useState(0);

  document.addEventListener("scroll", function () {
    if (document.documentElement.scrollTop > 470) {
      setTop(0);
      setOpacity(1);
    } else {
      setTop(150);
      setOpacity(0);
    }
  });
  if (props) {
    return (
      <Motion style={{ top: spring(top), opacity: spring(opacity) }}>
        {({ top, opacity }) => (
          <div
            id='contentMessageListContainer'
            style={Object.assign({}, {}, { top, opacity })}
          >
            <div className='contentBoxTitle'>후원회원들의 응원메시지</div>
            <div className='contentBoxSubTitle'>
              {props.ngoName}의 후원회원들이 직접 남긴 메시지입니다.
            </div>
            <div id='contentMessageListBox'>
              {currentMessageList.messageList.map(item => {
                return (
                  <ContentMessageListEntry
                    key={item.index}
                    user={item.user}
                    message={item.message}
                  />
                );
              })}
            </div>
          </div>
        )}
      </Motion>
    );
  } else {
    return <h4>응원메시지가 아직 없습니다</h4>;
  }
}

export default ContentMessageList;
