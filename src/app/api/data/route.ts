import { vehiclesData } from "@/data/convertedData";
import { NextRequest, NextResponse } from "next/server";
import { collect } from "collect.js";

interface VehicleGroup {
	vehicleType: string;
	fuelType: string[];
}

const yearFilter = collect(vehiclesData).pluck("year").unique().all();

const vehicleFuelType: VehicleGroup[] = collect<VehicleType>(vehiclesData)
	.groupBy("VehicleID")
	.map((group: any, vehicleType) => {
		const fuelTypes = group
			.map((item: any) => item.fuelTypeID)
			.unique()
			.values()
			.all();
		return { vehicleType, fuelType: fuelTypes };
	})
	.toArray();

const fuelTypeIdFilter = collect(vehiclesData)
	.pluck("VehicleID", "fuelTypeID")
	.all();
const vehicleIdFilter = collect(vehiclesData)
	.pluck("VehicleID")
	.unique()
	.sort()
	.all();
const speedFilter = collect(vehiclesData).pluck("speed").unique().sort().all();
const ageFilter = collect(vehiclesData).pluck("age").unique().all();

export const GET = async (request: NextRequest, response: NextResponse) => {
	try {
		const data = {
			yearFilter,
			vehicleFuelType,
			fuelTypeIdFilter,
			vehicleIdFilter,
			speedFilter,
			ageFilter,
		};

		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};
