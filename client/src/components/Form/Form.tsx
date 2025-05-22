import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Difficulty, DifficultyEnum, ExamType } from "../../types/ExamTypes";
import "./Form.less";
import { InputFile } from "../InputFile";
import { handleFileUpload } from "../../utils/handleFileUpload";
import { LoaderModal } from "../LoaderModal";

const initialExam: ExamType = {
 department: "",
 course: 0,
 lesson: "",
 questions: [],
 config: { Легкий: 0, Средний: 0, Сложный: 0 },
 startAt: null,
 endAt: null,
};

type FormType = {
 state: ExamType;
 setState: Dispatch<SetStateAction<ExamType>>;
 showTestLabels?: boolean;
};

export const Form = ({ state, setState, showTestLabels = false }: FormType) => {
 const [isLoading, setIsLoading] = useState(false);

 const inputFileOnChange = async (
  e: ChangeEvent<HTMLInputElement>,
  difficulty: Difficulty,
 ) => {
  setIsLoading(true);
  await handleFileUpload(e, setState, difficulty);
  setIsLoading(false);
 };

 const setContentField =
  <K extends keyof ExamType>(key: K) =>
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   const rawValue = e.target.value;

   setState(prev => {
    const base = prev ?? initialExam;
    const value = typeof base[key] === "number" ? Number(rawValue) : rawValue;

    return {
     ...base,
     [key]: value as ExamType[K],
    };
   });
  };

 const setConfigField =
  (difficulty: Difficulty) => (e: ChangeEvent<HTMLInputElement>) => {
   const rawValue = e.target.value;
   const numericValue = Number(rawValue);

   setState(prev => {
    const base: ExamType = prev ?? {
     department: "",
     course: 0,
     lesson: "",
     questions: [],
     config: { Легкий: 0, Средний: 0, Сложный: 0 },
     startAt: null,
     endAt: null,
    };

    return {
     ...base,
     config: {
      ...base.config,
      [difficulty]: numericValue,
     },
    };
   });
  };

 const countQuestions = (difficulty: DifficultyEnum) => {
  const currentQuestions = state.questions.filter(
   question => question.difficulty === difficulty,
  );

  return currentQuestions.length;
 };

 return (
  <div className="form">
   {showTestLabels && (
    <>
     <label className="form-label">
      <h5>Ваше имя</h5>
      <input
       placeholder="Ваше имя"
       type="text"
       value={state?.name ?? ""}
       onChange={e => setContentField("name")(e)}
      />
     </label>
     <label className="form-label">
      <h5>Пароль</h5>
      <input
       placeholder="Пароль"
       type="password"
       value={state?.password ?? ""}
       onChange={e => setContentField("password")(e)}
      />
     </label>
     <label className="form-label">
      <h5>Дата начала теста</h5>
      <input
       placeholder="Дата начало"
       type="datetime-local"
       value={state?.startAt ?? ""}
       onChange={e => setContentField("startAt")(e)}
      />
     </label>
     <label className="form-label">
      <h5>Дата окончания теста</h5>
      <input
       placeholder="Дата окончания"
       type="datetime-local"
       value={state?.endAt ?? ""}
       onChange={e => setContentField("endAt")(e)}
       min={state?.startAt || ""}
      />
     </label>
    </>
   )}
   <label className="form-label">
    <h5>Кафедра</h5>
    <input
     placeholder="Кафедра"
     value={state?.department ?? ""}
     onChange={e => setContentField("department")(e)}
    />
   </label>
   <label className="form-label">
    <h5>Курс</h5>
    <input
     placeholder="Курс"
     type="number"
     value={state?.course ?? ""}
     onChange={e => setContentField("course")(e)}
     min="1"
    />
   </label>
   <label className="form-label">
    <h5>Предмет</h5>
    <input
     placeholder="Предмет"
     value={state?.lesson ?? ""}
     onChange={e => setContentField("lesson")(e)}
    />
   </label>
   {!showTestLabels ? (
    <>
     <label className="form-label">
      <h5>Количества лёгких вопросов</h5>
      <input
       placeholder={DifficultyEnum.EASY}
       type="number"
       value={state?.config.Легкий ?? ""}
       onChange={setConfigField(DifficultyEnum.EASY)}
       min="0"
      />
     </label>
     <label className="form-label">
      <h5>Количества средних вопросов</h5>
      <input
       placeholder={DifficultyEnum.MIDDLE}
       type="number"
       value={state?.config.Средний ?? ""}
       onChange={setConfigField(DifficultyEnum.MIDDLE)}
       min="0"
      />
     </label>
     <label className="form-label">
      <h5>Количества сложных вопросов</h5>
      <input
       placeholder={DifficultyEnum.HARD}
       type="number"
       value={state?.config.Сложный ?? ""}
       onChange={setConfigField(DifficultyEnum.HARD)}
       min="0"
      />
     </label>
    </>
   ) : (
    ""
   )}
   {!showTestLabels ? (
    <div className="form-upload-files">
     <div>
      <label className="form-upload-files-label">
       <h5>Лёгкие вопросы</h5>
       <InputFile
        id={DifficultyEnum.EASY}
        onChange={e => inputFileOnChange(e, DifficultyEnum.EASY)}
       />
      </label>
      <h4>Кол-во: {countQuestions(DifficultyEnum.EASY)}</h4>
     </div>
     <div>
      <label className="form-upload-files-label">
       <h5>Средние вопросы</h5>
       <InputFile
        id={DifficultyEnum.MIDDLE}
        onChange={e => inputFileOnChange(e, DifficultyEnum.MIDDLE)}
       />
      </label>
      <h4>Кол-во: {countQuestions(DifficultyEnum.MIDDLE)}</h4>
     </div>
     <div>
      <label className="form-upload-files-label">
       <h5>Сложные вопросы</h5>
       <InputFile
        id={DifficultyEnum.HARD}
        onChange={e => inputFileOnChange(e, DifficultyEnum.HARD)}
       />
      </label>
      <h4>Кол-во: {countQuestions(DifficultyEnum.HARD)}</h4>
     </div>
    </div>
   ) : (
    <label className="form-upload-files-label">
     <h5>Загрузить вопросы из файла</h5>
     <InputFile
      id={DifficultyEnum.EASY}
      onChange={e => inputFileOnChange(e, DifficultyEnum.EASY)}
     />
    </label>
   )}

   {isLoading && <LoaderModal />}
  </div>
 );
};
