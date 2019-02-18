import React, { Component } from "react";
import countBy from "lodash.countby";
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
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

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
      data = this.props.summaryData.totalOpen.flat();
    } else if (status === "merged") {
      data = this.props.summaryData.totalMerged.flat();
    } else if (status === "declined") {
      data = this.props.summaryData.totalDeclined.flat();
    }

    const namesData = data.map(user =>
      user.author ? user.author.display_name : ""
    );

    const countedName = countBy(namesData);

    const newobject = Object.keys(countedName).map(objectKey => {
      let key = objectKey;
      let value = countedName[objectKey];
      return {
        name: key,
        value: value
      };
    });
    return newobject;
  }

  render() {
    const openForChart = this.getDataforChart("open");
    const mergedForChart = this.getDataforChart("merged");
    const declinedForChart = this.getDataforChart("declined");

    const COLORS = ["#0971f0",'#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


    return (
      <div className="summary-allGraphs">
        <div className="summary-firstGraph">
        Pull Requests
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
              minPointSize={10}
              label={{ fill: "#979797", fontSize: 20, position: "right" }}
              stroke="#8884d8"
              isAnimationActive={true}
              animationDuration={500}
              barSize={50}
              dataKey="qty"
              fill="#82ca9d"
            />
          </BarChart>
        </div>
        <div className="summary-secondGraph">
        <div className="summary-secondGraphOpen">
          <PieChart
            width={800}
            height={400}
            onMouseEnter={this.onPieEnter}
            dataKey="open"
          >
            <Pie className="summary-secondGraphOpenPie"
              data={openForChart}
              dataKey="value"
              cx={500}
              cy={200}
              labelLine={false}
              isAnimationActive={false}
              label={renderCustomizedLabel}
              outerRadius={190}
              fill="#8884d8"
            >
              {openForChart.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div>
          <PieChart
            width={800}
            height={400}
            onMouseEnter={this.onPieEnter}
            dataKey="merged"
          >
            <Pie
              data={mergedForChart}
              dataKey="value"
              cx={400}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              isAnimationActive={false}
              outerRadius={190}
              fill="#8884d8"
            >
              {mergedForChart.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div>
          <PieChart
            width={800}
            height={400}
            onMouseEnter={this.onPieEnter}
            dataKey="declined"
          >
            <Pie
              data={declinedForChart}
              dataKey="value"
              cx={200}
              cy={200}
              labelLine={true}
              label={renderCustomizedLabel}
              outerRadius={190}
              isAnimationActive={false}
              fill="#8884d8"
            >
              {declinedForChart.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
      </div>
    );
  }
}

export default Summary;
