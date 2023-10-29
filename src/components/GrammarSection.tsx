import { useState } from "react";
import presentsimplepic from "../assets/grammarPics/presentsimple.jpeg" 
import presentprogressivepic from "../assets/grammarPics/presentprogressive.jpeg" 
import presentperfect from "../assets/grammarPics/presentperfect.jpeg" 
import futuresimple from "../assets/grammarPics/futuresimple.jpeg" 
import futureprogressive from "../assets/grammarPics/futureprogressive.png" 
import futureperfect from "../assets/grammarPics/futureperfect.jpeg" 
import pastsimple from "../assets/grammarPics/pastsimple.jpeg" 
import pastprogressive from "../assets/grammarPics/pastprogressive.jpeg" 
import pastperfect from "../assets/grammarPics/pastperfect.jpeg" 





export const GrammarSection = () => {
  type GrammarPicsType = {
    [key: string]: { pic: string };
  };
  const grammarPics: GrammarPicsType = {
    presentsimple: { pic:presentsimplepic},
    presentprogressive: { pic: presentprogressivepic },
    presentperfect: { pic:presentperfect},
    futuresimple: { pic:futuresimple},
    futureperfect: { pic: futureperfect },
    futureprogressive: { pic:futureprogressive},
    pastsimple: { pic:pastsimple},
    pastprogressive: { pic:pastprogressive},
    pastperfect: { pic:pastperfect},

  };

  const times = ["present", "past", "future"];
  const tenses = ["simple", "progressive", "perfect"];
  const [time, setTime] = useState<string>("");
  const [tense, setTense] = useState<string>("");
   console.log("this is the time+tense", time+tense)
  const TimeButton = ({ timeFromTimes, time, setTime }: { timeFromTimes: string; time: string; setTime: React.Dispatch<React.SetStateAction<string>> }) => {
    console.log(time, timeFromTimes);
    const css = `button  rounded-lg ${time.includes(timeFromTimes) ? "border-blue-950 text-blue-950" : "border-white text-white"} border-2 p-2 text-sm`;
    return (
      <button
        className={css}
        onClick={() => {
          setTime(timeFromTimes);
        }}
      >
        {" "}
        {timeFromTimes}
      </button>
    );
  };

  const TenseButton = ({ tenseFromTenses, tense, setTense }: { tenseFromTenses: string; tense: string; setTense: React.Dispatch<React.SetStateAction<string>> }) => {
    const css = `button  rounded-lg ${tense.includes(tenseFromTenses) ? "border-blue-950 text-blue-950" : "border-white text-white"} border-2 p-2 text-sm`;
    return (
      <button
        className={css}
        onClick={() => {
          setTense(tenseFromTenses);
        }}
      >
        {" "}
        {tenseFromTenses}
      </button>
    );
  };

  return (
    <div className="garmmar-con w-full h-[80%]  bg-red-400">
      <div className="buttons w-full h-[18%] ">
        <div className="times flex flex-row justify-around p-4 border-b-2  border-white">
          {times.map((timeFromTimes) => (
            <TimeButton timeFromTimes={timeFromTimes} time={time} setTime={setTime} />
          ))}
        </div>
        <div className="tenses flex flex-row justify-around p-4 border-b-2  border-white">
          {tenses.map((tenseFromTenses) => (
            <TenseButton tenseFromTenses={tenseFromTenses} tense={tense} setTense={setTense} />
          ))}
        </div>
      </div>
        <div className="tensePics w-full h-[82%]  overflow-auto">{time && tense && <img className="w-full overflow-scroll" src={grammarPics[time + tense].pic} alt="grammar rules pics" />}</div>
    </div>
  );
};
