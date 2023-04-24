import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import type { ElementType } from "react";

type PolymorphicProps<C extends ElementType> = {
  as?: C;
} & ComponentPropsWithoutRef<C> &
  PropsWithChildren;

const Polymorphic = <C extends ElementType = "div">({
  as,
  children,
  ...rest
}: PolymorphicProps<C>) => {
  const Component = as || "div";

  return <Component {...rest}>{children}</Component>;
};

export default Polymorphic;

<Polymorphic as="span">hi</Polymorphic>;
