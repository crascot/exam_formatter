//TODO под вопросом

import { createContext, useContext, ReactNode, useMemo, useState } from "react";

type modeType = "standart" | "selective" | ""; //TODO уточнить третий режим

type DifficultConfigContextType = {
 mode: modeType;
 setStandartMode: () => void;
 setSelectiveMode: () => void;
};

const DifficultConfigContext = createContext<
 DifficultConfigContextType | undefined
>(undefined);

type DifficultConfigProviderProps = {
 children: ReactNode;
};

export const DifficultConfigProvider = ({
 children,
}: DifficultConfigProviderProps) => {
 const [mode, setMode] = useState<modeType>("standart");

 const setStandartMode = () => {
  setMode("standart");
 };

 const setSelectiveMode = () => {
  setMode("selective");
 };

 const value = useMemo(
  () => ({
   mode,
   setStandartMode,
   setSelectiveMode,
  }),
  [],
 );

 return (
  <DifficultConfigContext.Provider value={value}>
   {children}
  </DifficultConfigContext.Provider>
 );
};

export const useDifficultConfig = (): DifficultConfigContextType => {
 const context = useContext(DifficultConfigContext);
 if (!context) {
  throw new Error(
   "useDifficultConfig must be used within a DifficultConfigProvider",
  );
 }
 return context;
};
