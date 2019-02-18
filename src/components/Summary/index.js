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
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

class Summary extends Component {

  componentDidMount() {
    this.props.getRepository(null, "OPEN", "summary");
    this.props.getRepository(null, "MERGED", "summary");
    this.props.getRepository(null, "DECLINED", "summary");
    this.props.getToken();
  }

  getDataforChart(status) {
    let data = "";
    if (status === "open") {
      data = this.props.summaryData.totalOpen.flat()
    }
    else if (status === "merged") {
      data = this.props.summaryData.totalMerged.flat()
    }
    else if (status === "declined") {
      data = this.props.summaryData.totalDeclined.flat()
    }

    const namesData = data.map(user =>
      user.author
      ? user.author.display_name
      : ""
    )

    const countedName = countBy(namesData);

    const newobject = Object.keys(countedName).map(objectKey => {
      let key = objectKey
      let value = countedName[objectKey];
      return {
        name: key,
        value: value
      }
    });
    return newobject
  }

  // renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) {
  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  //   const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  //   const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  //   ///AQUI PINTA EL PORCENTAJE QUE REPRESENTA, PERO QUERRIAMOS LOS NOMBRES
  //   return (
  //     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
  //       {`${(percent * 100).toFixed(0)}%`}
  //     </text>
  //   );
  // };
  render() {
    const openForChart = this.getDataforChart("open")
    const mergedForChart = this.getDataforChart("merged")
    const declinedForChart = this.getDataforChart("declined")

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#00e8fe', '#c40003', '#deff28', '#ff6441'];
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

        <PieChart width={800} height={400} onMouseEnter={this.onPieEnter} dataKey="open">
          <Pie
            data={openForChart}
            dataKey="value"
            cx={300}
            cy={200}
            labelLine={false}
            isAnimationActive={false}
            label={renderCustomizedLabel}
            outerRadius={190}
            fill="#8884d8"
          >

            {
              openForChart.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
        </PieChart>

        <PieChart width={800} height={400} onMouseEnter={this.onPieEnter} dataKey="merged">
          <Pie
            data={mergedForChart}
            dataKey="value"
            cx={300}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            isAnimationActive={false}
            outerRadius={190}
            fill="#8884d8"
          >

            {
              mergedForChart.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>

        <PieChart width={800} height={400} onMouseEnter={this.onPieEnter} dataKey="declined">
          <Pie
            data={declinedForChart}
            dataKey="value"
            cx={300}
            cy={200}
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={190}
            isAnimationActive={false}
            fill="#8884d8"
          >

            {
              declinedForChart.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
      </div>
    );
  }
}

export default Summary;
