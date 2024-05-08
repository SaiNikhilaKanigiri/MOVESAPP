import { vehiclesData } from "@/data/convertedData";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    const data = await request.json();

    const filterVehicleData: VehicleType[] = vehiclesData.filter((vehicle) => {
      return (
        vehicle.VehicleID === data.VehicleID &&
        vehicle.fuelTypeID === data.fuelTypeID &&
        vehicle.year === Number(data.year) &&
        vehicle.age === Number(data.age)
      );
    });

    const sortedEmissionData = filterVehicleData.sort((a, b) => {
      return a.speed - b.speed;
    });

    if (data.emissionType === "CO2") {
      const emissionData: any = sortedEmissionData.map((vehicle) => {
        const { VehicleID, fuelTypeID, CO2 } = vehicle;
        return { VehicleID, fuelTypeID, CO2 };
      });

      const data = {
        vehicleID: emissionData[0].VehicleID,
        fuelTypeID: emissionData[0].fuelTypeID,
        emissionName: "Atmospheric CO2",
        emissionType: "CO2",
        emissionValues: emissionData.map((item: any) => item.CO2),
      };

      return NextResponse.json(data, { status: 200 });
    }

    if (data.emissionType === "NOx") {
      const emissionData: any = sortedEmissionData.map((vehicle) => {
        const { VehicleID, fuelTypeID, NOx } = vehicle;
        return { VehicleID, fuelTypeID, NOx };
      });

      const data = {
        vehicleID: emissionData[0].VehicleID,
        fuelTypeID: emissionData[0].fuelTypeID,
        emissionName: "NOx",
        emissionType: "NOx",
        emissionValues: emissionData.map((item: any) => item.NOx),
      };

      return NextResponse.json(data, { status: 200 });
    }

    if (data.emissionType === "totalExh") {
      const emissionData: any = sortedEmissionData.map((vehicle) => {
        const { VehicleID, fuelTypeID, totalExh } = vehicle;
        return { VehicleID, fuelTypeID, totalExh };
      });

      const data = {
        vehicleID: emissionData[0].VehicleID,
        fuelTypeID: emissionData[0].fuelTypeID,
        emissionName: "PM2.5 Total Exh",
        emissionType: "totalExh",
        emissionValues: emissionData.map((item: any) => item.totalExh),
      };

      return NextResponse.json(data, { status: 200 });
    }

    if (data.emissionType === "brakeWare") {
      const emissionData: any = sortedEmissionData.map((vehicle) => {
        const { VehicleID, fuelTypeID, brakeWare } = vehicle;
        return { VehicleID, fuelTypeID, brakeWare };
      });

      const data = {
        vehicleID: emissionData[0].VehicleID,
        fuelTypeID: emissionData[0].fuelTypeID,
        emissionName: "PM2.5 Brakewear",
        emissionType: "brakeWare",
        emissionValues: emissionData.map((item: any) => item.brakeWare),
      };

      return NextResponse.json(data, { status: 200 });
    }

    if (data.emissionType === "tireWare") {
      const emissionData: any = sortedEmissionData.map((vehicle) => {
        const { VehicleID, fuelTypeID, tireWare } = vehicle;
        return { VehicleID, fuelTypeID, tireWare };
      });

      const data = {
        vehicleID: emissionData[0].VehicleID,
        fuelTypeID: emissionData[0].fuelTypeID,
        emissionName: "PM2.5 Tirewear",
        emissionType: "tireWare",
        emissionValues: emissionData.map((item: any) => item.tireWare),
      };

      return NextResponse.json(data, { status: 200 });
    }

    if (data.emissionType === "totalEnergy") {
      const emissionData: any = sortedEmissionData.map((vehicle) => {
        const { VehicleID, fuelTypeID, totalEnergy } = vehicle;
        return { VehicleID, fuelTypeID, totalEnergy };
      });

      const data = {
        vehicleID: emissionData[0].VehicleID,
        fuelTypeID: emissionData[0].fuelTypeID,
        emissionName: "Total Energy",
        emissionType: "totalEnergy",
        emissionValues: emissionData.map((item: any) => item.totalEnergy),
      };

      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json(sortedEmissionData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
