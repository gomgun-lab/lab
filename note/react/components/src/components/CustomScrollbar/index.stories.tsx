import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CustomScrollDiv from "./CustomScrollDiv";
import DUMMY from "../dummy";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/CustomScrollDiv",
  component: CustomScrollDiv,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof CustomScrollDiv>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomScrollDiv> = (args) => (
  <div style={{ height: "800px" }}>
    <CustomScrollDiv {...args}>
      <DUMMY />
    </CustomScrollDiv>
  </div>
);

export const Primary = Template.bind({});
