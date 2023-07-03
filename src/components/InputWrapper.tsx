import { ReactNode } from "react";

const InputWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="border-l-2 ">{children}</div>;
};

export default InputWrapper;
