"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useDataForm() {
  const [isLoading, setIsLoading] = useState(true);

  const [vehicleType, setVehicleType] = useState([]);
  const [fuelType, setFuelType] = useState<string[]>([]);
  const [vehicleFuelType, setVehicleFuelType] = useState<VehicleFuelType[]>([]);
  const [year, setYear] = useState<number[]>([]);

  const [selectedVehicleType, setSelectedVehicleType] = useState<string>();
  const [selectedFuelType, setSelectedFuelType] = useState<string>();
  const [selectedEmissions, setSelectedEmissions] = useState<string[]>([]);
  const [selectedAge, setSelectedAge] = useState<number>();
  const [selectedYear, setSelectedYear] = useState<string>("");

  const [errorEmission, setErrorEmission] = useState(false);

  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/data")
      .then((res) => {
        setVehicleType(res.data.vehicleIdFilter);
        setYear(res.data.yearFilter);
        setVehicleFuelType(res.data.vehicleFuelType);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedVehicleType) {
      const fuelType = vehicleFuelType.find(
        (vehicle) => vehicle.vehicleType === selectedVehicleType
      );
      if (fuelType) {
        setFuelType(fuelType.fuelType);
      }
    }
  }, [selectedVehicleType, vehicleFuelType, vehicleType]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      !selectedVehicleType ||
      !selectedFuelType ||
      selectedAge! < 0 ||
      !selectedYear
    )
      return alert("Please fill all the fields");

    if (selectedEmissions.length === 0) return setErrorEmission(true);

    const queryData = {
      vehicleType: selectedVehicleType,
      selectedFuel: selectedFuelType,
      selectedEmissions: selectedEmissions.join(","),
      year: selectedYear,
      age: selectedAge,
    };

    router.push(
      `/graph?VehicleID=${queryData.vehicleType}&fuelTypeID=${queryData.selectedFuel}&emissionType=${queryData.selectedEmissions}&year=${queryData.year}&age=${queryData.age}`
    );
  };

  const handleVehicleTypeChange = (value: string) => {
    const fuelType = vehicleFuelType.find(
      (vehicle) => vehicle.vehicleType === value
    );

    if (!fuelType?.fuelType.includes(selectedFuelType!)) {
      setSelectedFuelType("");
    }
    setSelectedVehicleType(value);
  };

  return {
    isLoading,
    vehicleType,
    fuelType,
    year,
    selectedEmissions,
    errorEmission,
    setSelectedEmissions,
    setSelectedYear,
    setSelectedFuelType,
    setSelectedAge,
    handleVehicleTypeChange,
    handleSubmit,
  };
}
