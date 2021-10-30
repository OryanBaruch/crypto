import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import moment from "moment";
import "./BtcChart.css";

const BtcChart = ({ btcData }) => {
  return (
    <ResponsiveContainer className="container" width="90%" height={555}>
      <AreaChart data={btcData}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.11} />
          </linearGradient>
        </defs>
        <Area dataKey={"High"} stroke="#838" fill="url(#color)"></Area>
        <XAxis
          dataKey={"Date"}
          tickFormatter={(timeStr) => moment(timeStr).format("DD/MM :hh:mm")}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 15, fontWeight: "bolder", fill: "white" }}
        ></XAxis>

        <YAxis
          className="yaxis"
          axisLine={false}
          type={"number"}
          domain={["Low", "High"]}
          tick={{ fontSize: 15, fontWeight: "bolder", fill: "white" }}
          tickLine={false}
          tickCount={10}
        ></YAxis>

        <Tooltip />

        <CartesianGrid opacity={0.6} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BtcChart;
