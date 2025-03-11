import { Link, useLocation } from "react-router-dom";
import { PageConsts } from "../../page-consts";
import "./Header.less";

export const Header = () => {
 const { pathname } = useLocation();

 const handleCurrentPage = (route: string) => {
  if (pathname === route) {
   return "header-current";
  } else {
   return "";
  }
 };

 return (
  <div className="header">
   <Link to={PageConsts.MAIN} className={handleCurrentPage(PageConsts.MAIN)}>
    На главную
   </Link>
   <Link
    to={PageConsts.EXAM_QUESTIONS}
    className={handleCurrentPage(PageConsts.EXAM_QUESTIONS)}
   >
    Экзамен
   </Link>
   <Link
    to={PageConsts.TEST_QUESTION}
    className={handleCurrentPage(PageConsts.TEST_QUESTION)}
   >
    Тест
   </Link>
  </div>
 );
};
