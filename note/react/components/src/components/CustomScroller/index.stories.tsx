import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CustomScrollbar from "./CustomScroller";
import DUMMY from "../dummy";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Scrollbar",
  component: CustomScrollbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof CustomScrollbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomScrollbar> = (args) => (
  <CustomScrollbar {...args}>
    <DUMMY />
  </CustomScrollbar>
);

export const Primary = Template.bind({});
