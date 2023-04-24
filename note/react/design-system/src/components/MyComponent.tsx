import React from "react";
import clsx from "clsx";

interface MyComponentProps {
  isActive: boolean;
  isError: boolean;
}

const MyComponent = ({ isActive, isError }: MyComponentProps) => {
  const className = clsx("my-component", {
    "is-active": isActive,
    "is-error": isError,
  });

  return <div className={className}>Hello, World!</div>;
};

export default MyComponent;
