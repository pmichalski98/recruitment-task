import { ReactNode } from "react";

const FormGroup = ({ children }: { children: ReactNode }) => {
  return <div className="flex bg-white border-2 rounded  ">{children}</div>;
};

export default FormGroup;
