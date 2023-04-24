import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Polymorphic from "./Ploymorphic";

export default {
  title: "Component/Polymorphic",
  component: Polymorphic,
} as ComponentMeta<typeof Polymorphic>;

const Template: ComponentStory<typeof Polymorphic> = (args) => (
  <Polymorphic {...args}>Hello World!!</Polymorphic>
);

export const Span = Template.bind({});
Span.args = {
  as: "span",
};

export const P = Template.bind({});
P.args = {
  as: "p",
};

export const Body = Template.bind({});
Body.args = {
  as: "body",
};

export const H1 = Template.bind({});
H1.args = {
  as: "h1",
};

export const A = Template.bind({});
A.args = {
  as: "a",
  href: "https://www.google.com/",
};

export const Button = Template.bind({});
Button.args = {
  as: "button",
};
