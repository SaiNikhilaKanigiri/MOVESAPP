import { vehiclesData } from "@/data/convertedData";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
	try {
		const data = await request.json();

		const filterVehicleData: VehicleType[] = vehiclesData.filter((vehicle) => {
			return (
				vehicle.VehicleID === data.VehicleID &&
				vehicle.fuelTypeID === data.fuelTypeID &&
				vehicle.year === Number(data.year)
			);
		});

		const sortedEmissionData = filterVehicleData.sort((a, b) => {
			return a.speed - b.speed;
		});

		return NextResponse.json(sortedEmissionData, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
};
