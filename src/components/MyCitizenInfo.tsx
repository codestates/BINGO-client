import React, { useEffect, useState } from "react";
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import "./css/MyCitizenInfo.css";
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

interface ItemDonate {
  ngo: { categoryName: [], ngoName: string }
}
interface ItemLove {
  categoryName: [], ngoName: string 
}
let count = 0;

function MyCitizenInfo(){
  const state = useSelector((state: RootState) => state.mypageReducer);
  const { mypageInfo } = state;
  const [data, setData] = useState([""]);
  const [isThereEnoughData, setIsThereEnoughData] = useState(false);
  const tempArr = [""];

  const handleTourButton = () => {
    window.location.href = "./list"
  }

  if (mypageInfo.mypageInfo.donates) {
    let donates = mypageInfo.mypageInfo.donates;
    donates.map((item: ItemDonate) => {
      tempArr.push(item.ngo.ngoName);
      for(let i of item.ngo.categoryName){
        tempArr.push(i)
      }
    })
  }

  if (mypageInfo.mypageInfo.loves) {
    let loves = mypageInfo.mypageInfo.loves;
    loves.map((item: ItemLove) => {
      tempArr.push(item.ngoName);
      for(let i of item.categoryName){
        tempArr.push(i)
      }
    })
  }
  
  const filteredArr = tempArr.filter((element, index) => {
    return tempArr.indexOf(element) === index
  });

    let layout = cloud()
    .words(data.map(function(d) {
      return {text: d, size: 10 + Math.random() * 90};
    }))
    .padding(5)
    .rotate(0)
    .size([450, 450])
    .font("S-CoreDream")
    .fontSize(function(d: any): any { return d.size })
    .on("end", draw);

    if(count === 0){
      layout.start();
    }

    function draw(words: any) {
      d3.select("#myCitizenInfoMain").append("svg")
          .attr("width", 450)
          .attr("height", 450)
        .append("g")
          .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
          .data(words)
        .enter().append("text")
          .style("font-size", function(d: any) { return d.size + "px"; })
          .style("font-family", "S-CoreDream")
          .attr("text-anchor", "middle")
          .attr("transform", function(d: any) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d: any) { return d.text; });
        }

        window.addEventListener('scroll', () => {
          if(count === 0){
            d3.select('#myCitizenInfoMain').selectAll("svg").remove();
            if(filteredArr[0] === ""){
              setData([""])
              d3.select('#myCitizenInfoMain').selectAll("svg").remove();
            } else {
              setIsThereEnoughData(true);
              setData(filteredArr);
            }
            count++;
          }
        })

  return (
  <div id="myCitizenInfoContainer">
    <div className="myPageTitle">소셜 키워드</div>
    <div className="myPageSubTitle">후원과 좋아요를 통해 분석한 랜덤키워드를 띄워드립니다.</div>
    <div id="myCitizenInfoMain">
      {isThereEnoughData ? null :      
      <div id="myAlertContainer">
        <div>빙고가 당신의 후원활동을 분석할 수 있도록 <br /> NGO단체에 좋아요를 누르거나 후원해주세요!</div>
        <button onClick={handleTourButton}>NGO단체 둘러보기</button>
      </div>}
    </div>
  </div>
  )
}

export default MyCitizenInfo;