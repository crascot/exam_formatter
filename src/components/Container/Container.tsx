import { ReactNode } from "react";
import { Header } from "../Header";
import "./Container.less";

type ContainerType = {
 children: ReactNode;
};

export const Container = ({ children }: ContainerType) => {
 return (
  <div className="container">
   <Header />
   <div className="container-block">{children}</div>
  </div>
 );
};
