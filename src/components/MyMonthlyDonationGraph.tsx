import React, { useEffect } from "react";
import * as d3 from 'd3';
import "./css/MyMonthlyDonationGraph.css";
    
function MyMonthlyDonationGraph(){
  useEffect(() => {
    const width = 950;
    const height = 500;
    const margin = {top: 40, left: 40, bottom: 40, right: 40};
    
    interface MyData {
      name: string,
      value: number,
    }

    const data = [
        {name: '1월', value: 30},
        {name: '2월', value: 60},
        {name: '3월', value: 50},
        {name: '4월', value: 10},
        {name: '5월', value: 0},
        {name: '6월', value: 0},
        {name: '7월', value: 0},
        {name: '8월', value: 0},
        {name: '9월', value: 0},
        {name: '10월', value: 0},
        {name: '11월', value: 0},
        {name: '12월', value: 0},
      ];
    
    const x = d3.scaleBand()
      // .scaleBand() 그래프의 막대의 반복되는 범위를 정해줍니다.
      .domain(data.map(d => d.name))
      // .domain() 각각의 막대에 순서대로 막대에 매핑합니다.
      .range([margin.left, width - margin.right])
      // 시작위치와 끝 위치로 눈금의 범위를 지정합니다.
      .padding(0.2);
      // 막대의 여백을 설정합니다.
    
    // line chart와 동일
    const y = d3.scaleLinear()
      .domain([0, d3.max<MyData, any>(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);
    
    // line chart와 동일
    const xAxis = g => g
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x)
        .tickSizeOuter(0));
    
    // line chart와 동일
    const yAxis = g => g
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select('.domain').remove());
    
    // line chart와 동일
    const svg = d3.select('#myMonthlyDonationGraph').append('svg').style('width', width).style('height', height);
    
    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
    svg.append('g')
      .attr('fill', 'var(--main-color-green)')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function(d): any{return x(d.name)})
      .attr('y', d => y(d.value))
      .attr('height', d => y(0) - y(d.value))
      .attr('width', x.bandwidth());
      // .bandwidth() 이름 그대로 막대기의 너비값을 응답합니다.
      // 인자값으로 명칭된 d가 svg 엘리먼트 속성 d를 의미하는 줄 알았는데, 그냥 data 값을 의미하는 듯 합니다.
    
    svg.node();
  })

  return (
    <div id="myMonthlyDonationGraphContainer">
      <div className="myPageTitle">2021 후원 그래프</div>
      <div className="myPageSubTitle">2021년 월별 후원 금액을 살펴보실 수 있습니다.</div>
      <div id="myMonthlyDonationGraph"></div>
    </div>
  )
}

export default MyMonthlyDonationGraph;