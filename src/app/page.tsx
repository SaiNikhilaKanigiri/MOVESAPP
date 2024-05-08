import DataForm from "@/components/DataForm";
import Image from "next/image";

const data = [
  {
    subelement: "movervehicletype",
    description:
      "Allows output of results by modal year. It is selectable for all MOVES runs.",
  },
  {
    subelement: "fueltype",
    description:
      "Allows output of results by fuel type. It is selectable for all MOVES runs.",
  },
  {
    subelement: "emission",
    description:
      "Allows output of results by fuel subtype. It is selectable for nonroad MOVES runs, but requires that",
  },
];

export default function Home() {
  return (
    <>
      <div className="mt-10 flex  flex-col-reverse lg:flex-row gap-4 px-4 ">
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <h2 className="text-3xl font-semibold tracking-tight uppercase">
            Moves
          </h2>
          <p>
            EPA’s Motor Vehicle Emission Simulator (MOVES) is a
            state-of-the-science emissions modeling system that estimates air
            pollution emissions for criteria air pollutants, greenhouse gases
            and air toxics. MOVES covers onroad vehicles such as cars, trucks
            and buses, and nonroad equipment such as bulldozers and lawnmowers.
            MOVES does not cover aircraft, locomotives, and commercial marine
            vessels. MOVES accounts for the phase-in of federal emissions
            standards, vehicle and equipment activity, fuels, temperatures,
            humidity, and emission control activities such as inspection and
            maintenance (I/M) programs
          </p>

          <h2 className="text-3xl font-semibold tracking-tight uppercase">
            Moves Web Process
          </h2>
          <div className="w-[80%] mx-auto">
            <Image
              src={"/layout.png"}
              alt={"layout"}
              className="mt-20 w-full"
              width={1000}
              height={500}
            />
          </div>
        </div>
        <div className="flex-grow">
          <DataForm />
        </div>
      </div>
      <div className="overflow-x-auto max-w-full w-full mt-16">
        <h2 className="text-2xl font-normal tracking-tight">Input Details</h2>
        <table className="w-full text-sm mt-10 text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Subelement
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.subelement}
                </th>
                <td className="px-6 py-4">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
