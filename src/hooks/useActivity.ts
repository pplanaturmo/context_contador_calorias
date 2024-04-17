import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export const useActivity = () => {

    const context = useContext(ActivityContext)
    if(!context){
        throw new Error("the hook useActivity must be used inside an ActivityProvider")
    }
    return context
}