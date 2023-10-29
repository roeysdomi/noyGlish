import React, { ReactNode, createContext, useContext, useState } from 'react';

type GeneralContextType = {
  // Define your context properties and functions here
  chosenExercise: TaskData | undefined;
  setChosenExercise:React.Dispatch<React.SetStateAction<TaskData | undefined>>
};
interface TaskData {
  _id: string;
  date: Date;
  task_text: string;
  user_solution?: string;
  grammar: string[];
}
const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export const GeneralProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>  {
  // Initialize state and functions for context here
  const [chosenExercise, setChosenExercise] = useState<TaskData>();
   const value={chosenExercise, setChosenExercise}
  return (
    <GeneralContext.Provider value={value}>
      {children}
    </GeneralContext.Provider>
  );
};


export const useGeneral = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error('useGeneral must be used within a GeneralProvider');
  }
  return context;
};
