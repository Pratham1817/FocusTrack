import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  ResponsiveContainer,
  Area,
} from "recharts";

import { generateMeetingsChartData } from "../../utils/helpers";
import { useThemeColors } from "../../context/ThemeContext";

const DashboardAreaChart = ({ meetings }) => {
  const { isLight } = useThemeColors();
  const meetingsChartData = generateMeetingsChartData(meetings);

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
      className="mr-8 text-sm sm:text-base"
    >
      <h1 className="mb-5 text-center font-semibold">
        Amount of meetings (next 4 months)
      </h1>
      <AreaChart data={meetingsChartData} className="text-black">
        <CartesianGrid
          strokeDasharray="5 5"
          stroke={`${isLight ? "rgba(64, 64, 64, 0.4)" : "rgba(173, 173, 173, 0.6)"}`}
        />
        <XAxis
          dataKey="month"
          stroke={`${isLight ? "black" : "white"}`}
          axisLine={false}
          tickMargin={4}
        />

        <YAxis
          allowDecimals={false}
          axisLine={false}
          stroke={`${isLight ? "black" : "white"}`}
        />
        <Tooltip
          cursor={{ stroke: "rgb(64 64 46)", strokeWidth: 1 }}
          contentStyle={{
            backgroundColor: !isLight ? "rgb(38 38 38)" : "rgb(245 245 245)",
            color: !isLight ? "white" : "black",
          }}
        />
        <Area
          dataKey="meetings"
          stroke="rgb(16 185 129)"
          strokeWidth="2px"
          fillOpacity={0.7}
          fill="rgb(16 185 129)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DashboardAreaChart;
