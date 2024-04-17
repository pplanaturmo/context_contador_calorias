import { ReactNode, createContext, useReducer, Dispatch, useMemo } from "react";
import {
  ActivityActions,
  ActivityState,
  activityReducer,
  initialState,
} from "../reducers/activityReducer";
import { categories } from "../data/categories";
import { Activity } from "../types";

type ActivityProviderProps = {
  children: ReactNode;
};

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
  caloriesConsumed:number
  caloriesSpent: number
  netCalories: number
  categoryName: (category: Activity["category"]) => string[]
  noActivities:boolean
};

export const ActivityContext = createContext<ActivityContextProps>(
  {} as ActivityContextProps
);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {

  const [state, dispatch] = useReducer(activityReducer, initialState);


  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const caloriesSpent = useMemo(
    () =>
        state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const netCalories = useMemo(()=>caloriesConsumed - caloriesSpent, [state.activities])

  
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [state.activities]
  );

  const noActivities = useMemo(() => state.activities.length === 0,[state.activities])

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumed,
        caloriesSpent,
        netCalories,
        categoryName,
        noActivities
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
