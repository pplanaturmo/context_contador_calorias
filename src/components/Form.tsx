import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import { useActivity } from "../hooks/useActivity";

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form() {
  const [activity, setActivity] = useState<Activity>(initialState);

  const {state,dispatch} = useActivity()

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];

      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(event.target.id);

    setActivity({
      ...activity,
      [event.target.id]: isNumberField
        ? +event.target.value
        : event.target.value,
    });
  };

  const isNotValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() === "" || calories <= 0;
  };

  const categoryName = () => {
    const { category } = activity;
    const categoryType = categories.find((item) => item.id === category);
    return categoryType?.name;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-md"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category">Categoría:</label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-md w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-200 p-2 rounded-md"
          placeholder="Ej. Ensalada, Zumo de naranja, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
          autoComplete="on"
        ></input>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-200 p-2 rounded-md"
          placeholder="0"
          value={activity.calories > 0 ? activity.calories : ""}
          onChange={handleChange}
        ></input>
      </div>
      <input
        type="submit"
        className="bg-green-800 hover:bg-green-500 w-full p-2 font-bold uppercase text-white border-2 border-black cursor-pointer disabled:opacity-10"
        value={`Guardar ${categoryName()}`}
        disabled={isNotValidActivity()}
      ></input>
    </form>
  );
}
