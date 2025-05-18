import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const DashboardChart = () => {
  return (
    <BarChart
      data={{
        labels: ["Complete", "Pending", "RTO", "Cancel"],
        datasets: [
          {
            data: Array.from({ length: 4 }, () => Math.random() * 100),
          },
        ],
      }}
      width={screenWidth - 60}
      height={220}
      yAxisLabel="%"
      yAxisSuffix=""
      withInnerLines={false}
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        decimalPlaces: 0,
        barPercentage: 1.2, // 👈 bar width
        color: (opacity = 1) => `#FF0059`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726",
        },
      }}
      style={{
        borderRadius: 16,
      }}
    />
  );
};

export default DashboardChart;
