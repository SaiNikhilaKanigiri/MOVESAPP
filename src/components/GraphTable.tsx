"use client";

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

interface GraphTableProps {
	postData: {
		year: string | null;
		fuelTypeID: string | null;
		VehicleID: string | null;
	};
	emissionData: EmissionData[];
	emissionType: string | null;
}

const pageSize = 10;

export function GraphTable({
	emissionData,
	postData,
	emissionType,
}: GraphTableProps) {
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	// Calculate total number of pages
	const totalPages = Math.ceil(data.length / pageSize);

	// Slice data to display only items for the current page
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const currentData = data.slice(startIndex, endIndex);

	// Function to handle page change
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const emissionTypes = emissionType?.split(",");

	useEffect(() => {
		axios
			.post("/api/emission-table/", {
				...postData,
				emissionNames: emissionData.map((item) => item.emissionName),
			})
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [emissionData, postData]);

	const csvData = [
		[
			"Year",
			"Fuel Type ID",
			"Vehicle ID",
			"Speed",
			"Age",
			...emissionData.map((item) => item.emissionName),
		],
		...data.map((item: any) => [
			item.year,
			item.fuelTypeID,
			item.VehicleID,
			item.speed,
			item.age,
			...(emissionTypes?.map((name) => item[name]) as any),
		]),
	];

	return (
		<>
			<div>
				<Table className="table-fixed">
					<TableHeader>
						<TableRow className="sticky top-0">
							<TableHead>Year</TableHead>
							<TableHead>Fuel Type ID</TableHead>
							<TableHead>Vehicle ID</TableHead>
							<TableHead>Speed</TableHead>
							<TableHead>Age</TableHead>
							{emissionTypes?.map((name, index) => (
								<TableHead key={index}>
									{
										emissionData.find((item) => item.emissionType === name)
											?.emissionName
									}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{currentData.map((item: any, index: number) => (
							<TableRow key={index}>
								<TableCell>{item.year}</TableCell>
								<TableCell>{item.fuelTypeID}</TableCell>
								<TableCell>{item.VehicleID}</TableCell>
								<TableCell>{item.speed}</TableCell>
								<TableCell>{item.age}</TableCell>
								{emissionTypes?.map((name, index) => (
									<TableCell key={index}>{item[name]}</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
				<div className="flex items-center justify-end space-x-2 py-4">
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
						<Button
							key={page}
							onClick={() => handlePageChange(page)}
							variant={currentPage === page ? "default" : "secondary"}
							size="sm"
						>
							{page}
						</Button>
					))}
				</div>
			</div>
			<Button asChild className="my-10 float-end">
				<CSVLink data={csvData}>Download CSV</CSVLink>
			</Button>
		</>
	);
}
