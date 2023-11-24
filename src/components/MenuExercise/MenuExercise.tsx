import { useGeneral } from "../../contexts/GeneralContext";
import { useAsync } from "../../hooks/useAsync";
import { getAllTasks, deleteTask, createTask } from "../../services/exercise";
import { GrammarSection } from "../GrammarSection";
import React, { useState } from "react";
const MenuExercise: React.FC = () => {
  const [isExercises, setIsExercises] = useState(true);
  const [create, setCreate] = useState<boolean>();
  const { data, loading, error } = useAsync(getAllTasks);
  const { setChosenExercise, chosenExercise } = useGeneral();
  return (
    <>
      <div className="menu-exercises-con bg-gray-200 w-[27%] h-full  ">
        <div className="menu-exercises flex  flex-col    w-full h-full">
          <div className="title bg-amber-200 w-full h-[15%] flex  flex-col items-center justify-between  text-amber-800">
            <div className="button w-full h-[80%] bg-amber-200   text-amber-800 flex-center-center  text-5xl">Noyglish</div>
            <div
              onClick={() => {
                setCreate(true);
              }}
              className="button w-full h-[20%] bg-amber-800 text-white cursor-pointer flex-center-center"
            >
              create +
            </div>
          </div>
          <div className="options flex flex-row  w-full h-[10%]">
            <div
              className="sub-title bg-amber-100    h-full w-[50%] flex-center-center  cursor-pointer"
              onClick={() => {
                setCreate(false);
                setIsExercises(true);
              }}
            >
              Exercises
            </div>
            <div
              className="sub-title bg-amber-100   h-full w-[50%] flex-center-center cursor-pointer border-yellow-800 border-l-2"
              onClick={() => {
                setCreate(false);
                setIsExercises(false);
              }}
            >
              Grammar
            </div>
          </div>
          {create && <Create />}
          {!create && !loading && isExercises ? (data as TaskData[]) && <ExerciseList listExercise={data as TaskData[]} setChosenExercise={setChosenExercise} /> : !create && <GrammarSection />}
        </div>
      </div>
    </>
  );
};
interface TaskData {
  _id: string;
  date: Date;
  task_text: string;
  user_solution?: string;
  grammar: string[];
}
const listFromLastToFirst = ({ listExercise, setChosenExercise }: { listExercise: TaskData[]; setChosenExercise: React.Dispatch<React.SetStateAction<TaskData | undefined>> }) => {
  return [...listExercise].reverse().map((task, index) => {
    const originalIndex = listExercise.length - 1 - index;
    return <Exercise key={originalIndex + task._id} data={originalIndex + 1} task={task} setChosenExercise={setChosenExercise} />;
  });
};
const ExerciseList = ({ listExercise, setChosenExercise }: { listExercise: TaskData[]; setChosenExercise: React.Dispatch<React.SetStateAction<TaskData | undefined>> }) => {
  return (
    <>
      <div className="exercises  w-full h-[80%]  overflow-scroll custom-scrollbar ">{listFromLastToFirst({ listExercise, setChosenExercise })}</div>
    </>
  );
};

const Exercise = ({ data, task, setChosenExercise }: { data: number; task: TaskData; setChosenExercise: React.Dispatch<React.SetStateAction<TaskData | undefined>> }) => {
  console.log(task);
  return (
    <div
      onClick={() => {
        setChosenExercise(task);
      }}
      className="exercise-con bg-green-200 text-green-900 flex-center-center w-full h-[10%] border-b-2 border-green-300 active:scale-95 hover:bg-green-900 hover:text-white cursor-pointer"
    >
      <div className="title">Exercise {data} #</div>
      <div
        className="delete cursor-pointer"
        onClick={() => {
          deleteTask(task._id);
        }}
      >
        delete
      </div>
    </div>
  );
};

const Create = () => {
  let task: TaskData = {
    _id: "",
    date: new Date(),
    task_text: "",
    user_solution: "",
    grammar: ["present simple ", "present progressive", "past simple", "past progressive", "future simple", "future progressive"],
  };
  const [taskText, setTaskText] = useState<string | undefined>();
  return (
    <>
      <div className="exercises bg-amber-300 w-full h-[80%]  overflow-scroll custom-scrollbar flex flex-col items-center justify-around">
        <input
          type="text"
          className="w-[80%] h-[70%] rounded-lg "
          onChange={(e) => {
            setTaskText(e.target.value);
          }}
        />
        <div
          className="button cursor-pointer bg-amber-800 text-white rounded-lg p-4"
          onClick={() => {
            if (taskText) {
              task = { ...task, task_text: taskText };
              const {date,task_text,user_solution,grammar}=task
             const finalTask={date,task_text,user_solution,grammar}
              createTask(finalTask);
            }
          }}
        >
          add task+
        </div>
      </div>
    </>
  );
};

export default MenuExercise;
