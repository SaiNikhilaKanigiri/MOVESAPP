import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Vehicle Emission Chart",
		},
	},
	scales: {
		x: {
			title: {
				display: true,
				text: "Speed (km/h)",
			},
		},
		y: {
			title: {
				display: true,
				text: "Emission (g/km)",
			},
		},
	},
};

const labels = Array.from({ length: 16 }, (_, i) => i + 1).map((i) => `${i}`);

interface LineChartProps {
	emissionName: string;
	emissionValue: number[];
	borderColor?: string;
	backgroundColor?: string;
}

function LineChart({
	emissionName,
	emissionValue,
	borderColor,
	backgroundColor,
}: LineChartProps) {
	const data = {
		labels,
		datasets: [
			{
				label: emissionName,
				data: emissionValue,
				borderColor: borderColor || "rgb(255, 99, 132)",
				backgroundColor: backgroundColor || "rgba(255, 99, 132, 0.5)",
			},
		],
	};

	return <Line options={options} data={data} />;
}

export default LineChart;
