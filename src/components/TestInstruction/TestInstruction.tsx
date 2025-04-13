import { downloadTest } from "../../utils/download/downloadTest";
import { Instructions } from "../Instructions";

export const TestInstructions = () => {
 return <Instructions downloadFile={downloadTest} />;
};
