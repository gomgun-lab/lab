import React, { PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonVariants = "primary" | "secondary";

interface ButtonProps
  extends PropsWithChildren,
    React.HTMLAttributes<HTMLButtonElement> {
  // extends DefaultComponentProps, SizeProps<ButtonSize>, DisableProps, SideContentProps, LoaindgProps

  /**
   * variant of button
   */
  styleVariant?: ButtonVariants;
  /**
   * 'type' attribute of typical HTML button
   *
   * @default 'button'
   */
  type?: HTMLButtonElement["type"];
}

const Button = ({ styleVariant = "primary", children }: ButtonProps) => {
  const variant = buttonVariants[styleVariant];
  const className = clsx(styles.button, styles[variant]);

  return <button className={className}>{children}</button>;
};

export default Button;
