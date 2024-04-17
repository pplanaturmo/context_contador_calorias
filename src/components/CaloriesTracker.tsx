
import CaloriesDisplay from "./CaloriesDisplay";
import { useActivity } from "../hooks/useActivity";

export default function CaloriesTracker() {
  const { caloriesConsumed, caloriesSpent, netCalories } = useActivity();

  return (
    <>
      <h2 className="text-2xl font-black text-white text-center">
        Resumen de Calorías
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-around gap-5 mt-10">
        <CaloriesDisplay calories={caloriesConsumed} text={"Consumidas"} />
        <CaloriesDisplay calories={caloriesSpent} text={"Gastadas"} />

        <CaloriesDisplay calories={netCalories} text={"Saldo de calorías"} />
      </div>
    </>
  );
}
