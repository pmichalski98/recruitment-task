import { ComponentPropsWithoutRef } from "react";

const Input = (props: ComponentPropsWithoutRef<"input">) => {
  const styles = `h-full focus:outline-blue-400 text-end pr-4 font-medium text-lg ${props.className}`;
  return <input {...props} className={styles} />;
};

export default Input;
