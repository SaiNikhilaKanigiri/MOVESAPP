"use client";

import React from "react";
import { CSVDownload } from "react-csv";

const csvData = [
	["Vehicle Type", "Speed", "Emission", "Age"],
	["Car", 8, 1, 5],
	["Truck", 6.5, 2, 3],
];
const page = () => {
	return (
		<div>
			<CSVDownload data={csvData} />
		</div>
	);
};

export default page;
