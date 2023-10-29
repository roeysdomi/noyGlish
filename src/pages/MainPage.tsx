import React, { useState } from "react";
import SectionChat from "../components/SectionChat/SectionChat";
import SectionGrammar from "../components/SectionGrammar/SectionGrammar";
import MenuExercise from "../components/MenuExercise/MenuExercise";
import MenuWords from "../components/MenuWords/MenuWords";

const MainPage: React.FC = () => {
  return (
    <>
      <div className="main-page-con flex items-center w-full h-full">
        <MenuExercise />
        <SectionChat />
        <MenuWords/>
      </div>
    </>
  );
};
export default MainPage;
