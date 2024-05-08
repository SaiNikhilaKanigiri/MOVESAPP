"use client";

import { GraphTable } from "@/components/GraphTable";
import LineChart from "@/components/LineChart";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const colorPattern = [
	{ label: "CO2", color: "#FF0000" },
	{ label: "NOx", color: "#f27979" },
	{ label: "totalEnergy", color: "#0000FF" },
	{ label: "totalExh", color: "#bdc97a" },
	{ label: "brakeWare", color: "#FF00FF" },
	{ label: "tireWare", color: "#00FFFF" },
];

export default function GraphPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [emissionData, setEmissionData] = useState<EmissionData[]>([]);

	const [viewTable, setViewTable] = useState(false);

	const searchParams = useSearchParams();
	const vehicleID = searchParams.get("VehicleID");
	const fuelTypeID = searchParams.get("fuelTypeID");
	const emissionType = searchParams.get("emissionType");
	const year = searchParams.get("year");
	const age = searchParams.get("age");

	useEffect(() => {
		const data = {
			VehicleID: vehicleID,
			fuelTypeID: fuelTypeID,
			year: year,
			age: age,
		};

		const emissionTypes = emissionType?.split(",");
		emissionTypes?.map((emission: string) => {
			axios
				.post("/api/emissions/", {
					...data,
					emissionType: emission,
				})
				.then((response) => {
					setEmissionData((prev) => [
						...prev,
						{
							emissionName: response.data.emissionName,
							emissionValues: response.data.emissionValues,
							emissionType: response.data.emissionType,
							borderColor: colorPattern.find(
								(color) => color.label === response.data.emissionType
							)?.color,
							backgroundColor: colorPattern.find(
								(color) => color.label === response.data.emissionType
							)?.color,
						},
					]);
				})
				.catch((error) => {
					console.error(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		});
	}, [age, emissionType, fuelTypeID, vehicleID, year]);

	const router = useRouter();

	return (
		<>
			{isLoading && (
				<div className="h-screen">
					<h2 className="text-3xl text-center">Loading...</h2>
				</div>
			)}
			{!isLoading && (
				<>
					<div className="flex justify-between">
						<Button onClick={router.back}>Go Back</Button>
						{emissionData.length > 0 && (
							<Button
								onClick={() => {
									setViewTable((prev) => !prev);
								}}
							>
								{viewTable ? "Hide Table" : "View Table"}
							</Button>
						)}
					</div>
					{emissionData.length > 0 ? (
						<div className="w-full max-w-5xl mx-auto my-8 grid grid-cols-2 gap-4 p-4">
							{emissionData.map((emission, index) => (
								<div className="col-span-1" key={index}>
									<LineChart
										emissionName={emission.emissionName}
										emissionValue={emission.emissionValues}
										borderColor={emission.borderColor}
										backgroundColor={emission.backgroundColor}
									/>
								</div>
							))}
						</div>
					) : (
						<h2 className="text-3xl text-center">No data Found</h2>
					)}
					{viewTable && (
						<div>
							<GraphTable
								postData={{
									year: year,
									fuelTypeID: fuelTypeID,
									VehicleID: vehicleID,
								}}
								emissionData={emissionData}
								emissionType={emissionType}
							/>
						</div>
					)}
				</>
			)}
		</>
	);
}
