import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

import { NOTES_CHART_DATA } from "../../utils/constants";
import { generateNotesChartData } from "../../utils/helpers";
import { useThemeColors } from "../../context/ThemeContext";

const DashboardBarChart = ({ notes }) => {
  const { isLight } = useThemeColors();
  const notesChartData = generateNotesChartData(notes);

  return (
    <ResponsiveContainer
      width="100%"
      height={340}
      className="mr-6 text-sm sm:text-base"
    >
      <h1 className="text-center font-semibold">
        Amount of notes (all boards)
      </h1>
      <BarChart
        data={notesChartData}
        margin={{ top: 24 }}
        className="text-black"
      >
        <CartesianGrid
          strokeDasharray="5 5"
          stroke={`${isLight ? "rgba(64, 64, 64, 0.4)" : "rgba(173, 173, 173, 0.6)"}`}
        />
        <XAxis
          dataKey="column"
          stroke={`${isLight ? "black" : "white"}`}
          axisLine={false}
          tickMargin={5}
          tickSize={4}
        />
        <YAxis
          allowDecimals={false}
          axisLine={false}
          stroke={`${isLight ? "black" : "white"}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: !isLight ? "rgb(38 38 38)" : "rgb(245 245 245)",
            color: !isLight ? "white" : "black",
          }}
        />
        <Legend align="center" />
        {NOTES_CHART_DATA.map((bar) => (
          <Bar key={bar.dataKey} dataKey={bar.dataKey} fill={bar.fill} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardBarChart;
