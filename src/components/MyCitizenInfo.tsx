import React, { useEffect } from "react";
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import "./css/MyCitizenInfo.css";

function MyCitizenInfo(){
  useEffect(()=> {
    const data = ["동물권행동 카라", "강아지", "고양이", "유기견", "참여형 후원", "반려동물", "동물", "진돗개", "닥스훈트"]

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

    layout.start();

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
  }, [])

  return (
  <div id="myCitizenInfoContainer">
    <div className="myPageTitle">소셜 키워드</div>
    <div className="myPageSubTitle">후원과 좋아요를 통해 분석한 랜덤키워드를 띄워드립니다.</div>
    <div id="myCitizenInfoMain"></div>
  </div>
  )
}

export default MyCitizenInfo;