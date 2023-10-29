import React, { useEffect, useRef, useState } from "react";
import { translateText } from "../../services/translation";
const MenuWords = () => {
  const [wordToTranslate, setWordToTranslate] = useState<string>("");
  const [words, setWords] = useState<translatedWord[]>([]);
  const [translateMode, setTranslateMode] = useState<boolean>(true)
  console.log(translateMode)
 
  return (
    <>
      <div className="words-con  bg-gray-100 w-[20%] h-full flex flex-col justify-center items-center ">
        <div className="title bg-blue-200 w-full h-[9%] flex-center-center text-3xl text-blue-900 cursor-pointer"  >{ translateMode?'Translator':'AI'}:</div>
        <div className="options-buttons bg-blue-200 flex flex-row w-full justify-around  ">
          <div className="translate rounded-3xl bg-blue-800 text-white cursor-pointer p-4 m-3" onClick={()=>{setTranslateMode(true)}}>translate</div>
          <div className="ai rounded-3xl bg-blue-800 text-white cursor-pointer p-4 m-3 w-[20%] flex-center-center" onClick={()=>{setTranslateMode(false)}}>Ai</div>
        </div>
        {/* <form onSubmit={pushWordToList} className="w-full h-[30%] flex flex-col items-center justify-center gap-4 ">
          <input
            type="text"
            autoComplete="off"
            name="hebrewWord"
            dir="rtl"
            className="border-gray-300 border-2 rounded-xl focus:outline-none h-[30%] w-[80%] text-right p-4"
            onChange={(e) => {
              setWordToTranslate(e.target.value);
            }}
          />
          <button type="submit" className="bg-blue-500 rounded-2xl w-[50%]  p-2 text-white active:bg-white active:text-blue-500">
            translate
          </button>
        </form> */}
        {translateMode ?
        <iframe  className="words  w-full h-[90%] overflow-scroll custom-scrollbar " src="https://translate.google.com/?sl=iw&tl=en&op=translate&hl=iw" width="300" height="200"></iframe>:
        <iframe  className="words  w-full h-[90%] overflow-scroll custom-scrollbar " src="https://bard.google.com/" width="300" height="200"></iframe>
      }


        {/* <div className="words  w-full h-[90%] overflow-scroll custom-scrollbar ">
          {words.map((word) => {
            return <TranslatedWord word={word} key={word.english} />;
          })}
        </div> */}
      </div>
    </>
  );
};

interface translatedWord {
  hebrew: string;
  english: string;
}
const TranslatedWord = ({ word }: { word: translatedWord }) => {
  return (
    <div className="word-con border-b-2 border-gray-200 w-full flex flex-col justify-center items-center min-h-[23%] text-xl">
      <p>{word.hebrew}</p>
      <p className="text-blue-800">{word.english}</p>
    </div>
  );
};



export default MenuWords;
