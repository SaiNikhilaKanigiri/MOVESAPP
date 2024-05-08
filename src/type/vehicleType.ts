interface VehicleType {
	year: number;
	fuelTypeID: string;
	VehicleID: string;
	speed: number;
	age: number;
	NOx: number;
	CO2: number;
	totalEnergy: number;
	totalExh: number;
	brakeWare: number;
	tireWare: number;
}

interface VehicleFuelType {
	vehicleType: string;
	fuelType: string[];
}

interface EmissionData {
	emissionName: string;
	emissionType: string;
	emissionValues: number[];
	borderColor?: string;
	backgroundColor?: string;
}
