/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, Dispatch } from "react";
import { highlightedText, sendGrammarCheckRequest } from "../../services/grammarCheck";
import { useGeneral } from "../../contexts/GeneralContext";
import { updateTask } from "../../services/exercise";
import { ing } from "../../constant/ing.ts";
import { es } from "../../constant/es.ts";
import { ed } from "../../constant/ed.ts";
import { cases } from "../../constant/useCase.ts";
const SectionChat = () => {
  const [checkedText, setCheckedText] = useState<any>();
  const { chosenExercise } = useGeneral();
  const [IsWordsConversionOpen, setIsWordsConversionOpen] = useState<boolean>(true);

  const copyForAi = () => {
    const text = `give full report with grade( from 1-100) on how good the translation from this Hebrew text : ${chosenExercise?.task_text}. to this English text: ${checkedText} .   (please answer in Hebrew) .`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.log("Failed to copy text: ", err);
      });
  };
  return (
    <>
      <div className="chat-con bg-green-600 w-[60%] h-full overflow-scroll custom-scrollbar ">
        <AiChat checkedText={checkedText} />
        <GrammarResults checkedText={checkedText} />
        <WordsConversion IsWordsConversionOpen={IsWordsConversionOpen} />
        <HumanChat setCheckedText={setCheckedText} checkedText={checkedText} copyForAi={copyForAi} />
      </div>
    </>
  );
};
export default SectionChat;

const AiChat = ({ checkedText }: { checkedText: any }) => {
  const { chosenExercise } = useGeneral();
  const [chosenCase, setChosenCase] = useState<chosenCaseType>("presentsimple");
  const [openUseCase, setOpenUseCase] = useState(false);
  return (
    <div className="chat-ai-con h-[50%] w-full bg-slate-300 flex flex-row justify-around items-center">
      <div className="chai-ai w-[75%] h-[85%] bg-slate-100 rounded-2xl p-4 text-3xl  overflow-scroll custom-scrollbar relative" dir="rtl">
        {chosenExercise?.task_text}
        <UseCase chosenCase={chosenCase} setChosenCase={setChosenCase} openUseCase={openUseCase} setOpenUseCase={setOpenUseCase} />
      </div>
      <div className="tenses flex flex-col justify-center w-[20%] ">
        {chosenExercise?.grammar.map((tense) => (
          <div
            className="rounded-2xl bg-green-600   text-white w-full p-3 m-2 relative cursor-pointer"
            onClick={() => {
              console.log(tense);
              const tenseConnected= tense.split(" ").join('')
              setChosenCase(tenseConnected as chosenCaseType)
              setOpenUseCase(true);
            }}
          >
            {tense}
          </div>
        ))}
      </div>
    </div>
  );
};

type chosenCaseType = "presentsimple" | "presentprogressive" | "presentperfect" | "futuresimple" | "futureprogressive" | "futureperfect";
const UseCase = ({
  chosenCase,
  setChosenCase,
  openUseCase,
  setOpenUseCase,
}: {
  chosenCase: chosenCaseType;
  setChosenCase: React.Dispatch<React.SetStateAction<chosenCaseType>>;
  openUseCase: boolean;
  setOpenUseCase: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
  
 

  if (!openUseCase) return <></>;
  return (
    <div className="useCase absolute w-full overflow-y-scroll h-full  p-4 top-0 left-0 bg-white text-black rounded-2xl">
      <div
        className="close bg-red-500 text-white cursor-pointer flex-center-center"
        onClick={() => {
          setOpenUseCase(false);
        }}
      >
        close
      </div>

      <pre className="whitespace-pre-wrap">{cases[chosenCase]}</pre>
    </div>
  );
};
interface HumanChatProps {
  setCheckedText: React.Dispatch<React.SetStateAction<any>>;
}

const HumanChat = ({ setCheckedText, copyForAi, checkedText }: { setCheckedText: Dispatch<any>; copyForAi: () => void; checkedText: any }) => {
  const [humanInput, setHumanInput] = useState<string>("");
  const [highlight, setHighlight] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { chosenExercise } = useGeneral();
  useEffect(() => {
    if (highlight) {
      console.log(humanInput);
      setLoading(false);
      setCheckedText(highlightedText(humanInput, highlight));
    }
  }, [highlight]);

  async function setFixes() {
    setLoading(true);
    const high = await sendGrammarCheckRequest(humanInput);
    setHighlight(high);
  }
  async function saveLastTask() {
    if (chosenExercise) {
      console.log("saved task");
      const { _id, date, task_text, grammar } = chosenExercise;
      updateTask(chosenExercise._id, { date, task_text, grammar, user_solution: checkedText[0] as string });
    }
  }

  useEffect(() => {
    saveLastTask();
  }, [checkedText]);
  return (
    <>
      <div className="HumanChat-con bg-slate-500 w-full h-[50%] overflow-hidden flex-center-center ">
        <div className="w-[90%] h-[95%] flex-center-center bg-slate-100 rounded-2xl focus:border-transparent  text-2xl focus:outline-none focus:ring-0 focus:shadow-none resize-none">
          <div
            contentEditable={true}
            suppressContentEditableWarning={true}
            className="w-full h-[95%] bg-slate-100 rounded-2xl focus:border-transparent p-4 text-2xl focus:outline-none focus:ring-0 focus:shadow-none resize-none "
            onInput={(e) => {
              const target = e.target as HTMLDivElement;

              setHumanInput(target.innerText);
            }}
          >
            {chosenExercise && chosenExercise.user_solution}
          </div>
          <div className="buttons flex-center-center flex flex-col">
            <button
              className="bg-purple-500 text-white rounded-md text-sm  block p-1 m-3 hover:scale-110 active:scale-95 "
              onClick={() => {
                setFixes();
              }}
            >
              {loading ? "LOADING" : "grammar check"}
            </button>
            <button
              className="bg-emerald-800 text-white rounded-md text-sm  block p-4 m-3 hover:scale-110 active:scale-95 "
              onClick={() => {
                copyForAi();
              }}
            >
              copy for Ai
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

function GrammarResults(checkedText: any) {
  console.log(checkedText);
  if (!checkedText || !Array.isArray(checkedText.checkedText)) return <></>;
  return (
    <div className="chat-result-con h-[50%] w-full bg-purple-500 flex-center-center">
      <div className="chai-result w-[90%] h-[85%] bg-slate-100 rounded-2xl p-4">
        {checkedText.checkedText.map((word: any, index: number) => (
          <span key={index}>{word}</span>
        ))}
      </div>
    </div>
  );
}

function WordsConversion({ IsWordsConversionOpen }: { IsWordsConversionOpen: boolean }) {
  type RuleNames = "ed" | "es" | "ing";

  const rulesList = { ed, es, ing };
  const [rules, setRules] = useState<RuleNames>("ing");
  if (!IsWordsConversionOpen) return <></>;
  return (
    <div className="chat-result-con h-[50%] w-full bg-orange-500 flex flex-row items-center justify-around">
      <div className="options flex flex-col w-[7%]  h-[80%] items-center justify-around">
        <div
          className="es bg-slate-200 rounded-2xl p-5 cursor-pointer hover:scale-90 active:scale-110"
          onClick={() => {
            setRules("es");
          }}
        >
          ES/S
        </div>
        <div
          className="ing bg-slate-200 rounded-2xl p-5 cursor-pointer hover:scale-90 active:scale-110"
          onClick={() => {
            setRules("ing");
          }}
        >
          ING
        </div>
        <div
          className="ed bg-slate-200 rounded-2xl p-5 cursor-pointer hover:scale-90 active:scale-110"
          onClick={() => {
            setRules("ed");
          }}
        >
          ED
        </div>
      </div>
      <div className="chai-result w-[80%] h-[85%] bg-slate-100 rounded-2xl p-4 overflow-y-scroll    " dir="rtl">
        <pre className="whitespace-pre-wrap">{rulesList[rules]}</pre>
      </div>
    </div>
  );
}
