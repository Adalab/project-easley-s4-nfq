import React, { Component } from 'react';
import countBy from 'lodash.countby';
import "./Summary.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class Summary extends Component {
  componentDidMount() {
    this.props.getRepository(null, "OPEN", "summary");
    this.props.getRepository(null, "MERGED", "summary");
    this.props.getRepository(null, "DECLINED", "summary");
    this.props.getToken();
  }

  getDataforChart(status){
    let data="";
    if(status === "open"){
      data = this.props.summaryData.totalOpen.flat()
    }
    else if(status === "merged"){
      data = this.props.summaryData.totalMerged.flat()
    }
    else if(status === "declined"){
      data = this.props.summaryData.totalDeclined.flat()
      console.log('declined',data)
    }

    const namesData = data.map(user =>{
      if(user.author){
        return user.author.display_name
      }
    })

    console.log('reducebyname',namesData)
    const countedName = countBy(namesData);
    console.log('counted',countedName)
    const newCounted = {}
    newCounted.forEach(element => {

    });
    return countedName
  }

  render() {
    const openForChart = this.getDataforChart("open")
    const mergedForChart = this.getDataforChart("merged")
    const declinedForChart = this.getDataforChart("declined")

    return (
      <div className="summary-firstGraph">
        <BarChart
          width={800}
          height={600}
          data={[
            {
              name: "Open",
              qty: this.props.summaryData.open
            },
            {
              name: "Merged",
              qty: this.props.summaryData.merged
            },
            {
              name: "Decline",
              qty: this.props.summaryData.declined
            }
          ]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
          minPointSize={10} label={{ fill: '#979797', fontSize: 20, position: "right" }}
          stroke="#8884d8"
          isAnimationActive={true}
          animationDuration={500}
          barSize={50}
          dataKey="qty" fill="#82ca9d" />
        </BarChart>
      </div>
    );
  }
}

export default Summary;
