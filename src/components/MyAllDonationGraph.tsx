import React, { useEffect, useState } from "react";
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';
import "./css/MyAllDonationGraph.css";
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
    
interface MyData {
  name: string,
  value: number,
  color: string,
}

let count = 0;

function MyAllDonationGraph(){
  const color = ['#efa86b', '#c1484f', '#d35d50', '#f4c17c', '#fae8a4', '#df7454', '#e88d5d', '#f8d690'];
  const state = useSelector((state: RootState) => state.mypageReducer);
  const { mypageInfo } = state;
  const [data, setData] = useState([
    {name: 'A', value: 1000, color: '#efa86b'},
    {name: 'B', value: 1000, color: '#c1484f'},
    {name: 'C', value: 1000, color: '#d35d50'},
    {name: 'D', value: 1000, color: '#f4c17c'},
    {name: 'E', value: 1000, color: '#fae8a4'},
    {name: 'F', value: 1000, color: '#df7454'},
    {name: 'G', value: 1000, color: '#e88d5d'},
    {name: 'H', value: 1000, color: '#f8d690'}
  ])

  console.log(mypageInfo);

    let now = new Date();
    let yearNow = now.getFullYear();
    let monthNow = now.getMonth() + 1;
    let donates = mypageInfo.mypageInfo.donates;
    let arrangedData = [{name: "", value: 0, color: ""}];
    let alreadyInNgo = { "": 0 };
  
    for(let i = 0; i < donates.length; i++){
      if(donates[i].type === "once" && !alreadyInNgo[donates[i].ngo.ngoName]){
        alreadyInNgo[donates[i].ngo.ngoName] = donates[i].money
      } 
      else if (donates[i].type === "once" && alreadyInNgo[donates[i].ngo.ngoName]) {
        alreadyInNgo[donates[i].ngo.ngoName] += donates[i].money
      } 
      else if(donates[i].type === "repeat" && !alreadyInNgo[donates[i].ngo.ngoName]) {
        let yearStart = donates[i].createdAt.slice(0, 4);
        let monthStart = donates[i].createdAt.slice(5, 7);
        if(donates[i].ing) {
          let howManyMonthIng = (yearNow - yearStart) * 12 - (monthStart - 1) + monthNow
          alreadyInNgo[donates[i].ngo.ngoName] = donates[i].money * howManyMonthIng;
        } 
        else {
          let yearEnd = donates[i].updatedAt.slice(0, 4);
          let monthEnd = donates[i].updatedAt.slice(5, 7);
          let howManyMonthNotIng = (yearEnd - yearStart) * 12 - (Number(monthStart) - 1) + Number(monthEnd)
          alreadyInNgo[donates[i].ngo.ngoName] = donates[i].money * howManyMonthNotIng;
        }
      }
      else if(donates[i].type === "repeat" && alreadyInNgo[donates[i].ngo.ngoName]){
        let yearStart = donates[i].createdAt.slice(0, 4);
        let monthStart = donates[i].createdAt.slice(5, 7);
        if(donates[i].ing) {
          let howManyMonthIng = (yearNow - yearStart) * 12 - (monthStart - 1) + monthNow
          alreadyInNgo[donates[i].ngo.ngoName] += donates[i].money * howManyMonthIng;
        } 
        else {
          let yearEnd = donates[i].updatedAt.slice(0, 4);
          let monthEnd = donates[i].updatedAt.slice(5, 7);
          let howManyMonthNotIng = (yearEnd - yearStart) * 12 - (monthStart - 1) + monthEnd
          alreadyInNgo[donates[i].ngo.ngoName] += donates[i].money * howManyMonthNotIng;
        }
      }
    }
  
    for(let key in alreadyInNgo){
      let newObj = {name: "", value: 0, color: ""};
      newObj.name = key
      newObj.value = alreadyInNgo[key]
      arrangedData.push(newObj);
    }
    arrangedData.shift();
    arrangedData.shift();

    for(let i = 0; i < arrangedData.length; i++){
      arrangedData[i].color = color[i % 8];
    }

    console.log(arrangedData);
    const width = 400;
    const height = 400;
    
    const arc = d3.arc<PieArcDatum<MyData>>().innerRadius(75).outerRadius(Math.min(width, height) / 2);
    
    const arcLabel = (() => {
      const radius = Math.min(width, height) / 2 * 0.8;
      return d3.arc().innerRadius(radius).outerRadius(radius);
    })();
    
    const pie = d3.pie<MyData>()
      .sort((a, b) => b.value - a.value)
      .value(d => d.value);
    
    const arcs = pie(data);
    
    const svg = d3.select('#myAllDonationGraph').append('svg').style('width', width).style('height', height)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px S-CoreDream');
    
    const g = svg.append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`);
    
    g.selectAll('path')
      .data(arcs)
      .enter().append('path')
        .attr('fill', d => d.data.color)
            .attr('stroke', 'white')
            .attr('d', arc)
          .append('title')
            .text(d => `${d.data.name}: ${d.data.value}`);
        
    const text = g.selectAll('text')
      .data(arcs)
      .enter().append('text')
        .attr('transform', (d: any) => `translate(${arcLabel.centroid(d)})`)
        .attr('dy', '0.35em');
    
    text.append('tspan')
      .attr('x', 0)
      .attr('y', '-0.7em')
      // .style('font-weight', 'bold')
      .text(d => d.data.name)
    
    text.filter(d => (d.endAngle - d.startAngle > 0.25)).append('tspan')
      .attr('x', 0)
      .attr('y', '0.7em')
      .attr('fill-opacity', 0.7)
      // .text(d => d.data.value);
    
    // svg.node();

    window.addEventListener('scroll', () => {
      if(count === 0){
        d3.select('#myAllDonationGraph').selectAll("svg").remove();
        setData(arrangedData)
        count++;
      }
    })

  return (
      <div id="myAllDonationGraphContainer">
      <div className="myPageTitle">후원 그래프</div>
      <div className="myPageSubTitle">김빙고님의 총 후원내역을 단체별로 한눈에 살펴볼 수 있습니다.</div>
      <div id="myAllDonationGraph">
      </div>
    </div>
  )
}

export default MyAllDonationGraph;