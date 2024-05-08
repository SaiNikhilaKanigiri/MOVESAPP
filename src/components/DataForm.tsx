"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import states from "@/data/states";
import useDataForm from "@/hooks/useDataForm";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Emission {
  id: string;
  label: string;
}

const emissions: Emission[] = [
  {
    id: "CO2",
    label: "Atmospheric CO2",
  },
  {
    id: "NOx",
    label: "NOx",
  },
  {
    id: "totalExh",
    label: "PM2.5 Total Exh",
  },
  {
    id: "brakeWare",
    label: "PM2.5 Brakewear",
  },
  {
    id: "tireWare",
    label: "PM2.5 Tirewear",
  },
  {
    id: "totalEnergy",
    label: "Total Energy",
  },
];

const DataForm = () => {
  const {
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
  } = useDataForm();
  const [selectedState, setSelectedState] = useState("");
  const [counties, setCounties] = useState<string[] | undefined>([]);

  const handleStateChange = (value: any) => {
    setSelectedState(value);
    const selectedCounties = states.find((state) => state.state === value);

    setCounties(selectedCounties?.counties);
  };

  return (
    !isLoading && (
      <div className="max-w-[600px] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className=" flex flex-col gap-5 rounded-md"
              onSubmit={handleSubmit}
            >
              <div className="flex gap-2 flex-wrap w-full">
                <div className="flex flex-col gap-2 justify-start items-start">
                  <Label>State</Label>
                  <Select
                    onValueChange={(value) => handleStateChange(value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose State" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state, index) => (
                        <SelectItem key={index} value={state.state}>
                          {state.state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2 justify-start items-start">
                  <Label>County</Label>
                  <Select
                    // onValueChange={(value) => handleStateChange(value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose County" />
                    </SelectTrigger>
                    <SelectContent>
                      {counties?.map((county, index) => (
                        <SelectItem key={index} value={county}>
                          {county}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-start items-start">
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Select
                  onValueChange={(value) => handleVehicleTypeChange(value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleType?.map((vehicle, index) => (
                      <SelectItem key={index} value={vehicle}>
                        {vehicle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* fuel type will be here by vehicleType */}
              <div className="flex flex-col gap-2 justify-start items-start">
                <Label htmlFor="fuel">Fuel Type</Label>
                <Select
                  onValueChange={(value) => {
                    setSelectedFuelType(value);
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Fuel Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelType?.map((fuel, index) => (
                      <SelectItem key={index} value={fuel}>
                        {fuel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 justify-start items-start">
                  <Label htmlFor="age">Vehicle Age</Label>
                  <input
                    onChange={(e) => {
                      setSelectedAge(parseInt(e.target.value));
                    }}
                    type="number"
                    min="0"
                    max="30"
                    className="w-full p-2 rounded-md border border-gray-300"
                    placeholder="Enter Vehicle Age"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 justify-start items-start">
                  <Label htmlFor="year">Select a year</Label>
                  <Select
                    onValueChange={(value: any) => {
                      setSelectedYear(value);
                    }}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a year" />
                    </SelectTrigger>
                    <SelectContent>
                      {year.map((item, index) => (
                        <SelectItem key={index} value={item.toString()}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-start items-start">
                <Label>Emission</Label>
                <div className="grid grid-cols-1 gap-4 mt-2">
                  {emissions.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedEmissions([
                              ...selectedEmissions,
                              item.id,
                            ]);
                          } else {
                            setSelectedEmissions(
                              selectedEmissions.filter((e) => e !== item.id)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={item.id}>{item.label}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2"></div>
                </div>
                {errorEmission && (
                  <p className="text-red-500 text-sm">
                    Please select at least one emission
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <Button className="bg-[#0299DE] px-2 py-1 w-32 rounded-md hover:bg-[#224FA4] hover:text-white transition-all duration-500">
                  View Graph
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  );
};

export default DataForm;
