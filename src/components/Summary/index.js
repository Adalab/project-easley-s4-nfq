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

    const COLORS = ["#2F80ED", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf",
    "#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234",
    "#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
    "#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647",
    "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
    "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
    "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647",
    "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
    "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
    "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7",
    ];
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
              label={{ fill: "#2F80ED", fontSize: 20, position: "right" }}
              stroke="#2F80ED"
              isAnimationActive={true}
              animationDuration={500}
              barSize={50}
              dataKey="qty"
              fill="#2F80ED"
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
