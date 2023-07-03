import { ComponentPropsWithoutRef } from "react";

const Button = (props: ComponentPropsWithoutRef<"button">) => {
  const styles = `self-end min-w-[137px] mt-6 hover:opacity-80 transition bg-blue-700 text-white rounded px-6 py-2 text-lg ${props.className} `;
  return (
    <button className={styles} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
