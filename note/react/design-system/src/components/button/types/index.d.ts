interface ButtonProps extends PressEvents, FocusableProps {
  /** Whether the button is disabled. */
  isDisabled?: boolean;
  /** The content to display in the button. */
  children?: ReactNode;
}

export interface SpectrumButtonProps<T extends ElementType = "button">
  extends AriaBaseButtonProps,
    ButtonProps,
    LinkButtonProps<T>,
    StyleProps {
  /** The [visual style](https://spectrum.adobe.com/page/button/#Options) of the button. */
  variant:
    | "accent"
    | "primary"
    | "secondary"
    | "negative"
    | LegacyButtonVariant;
  /** The background style of the button. */
  style?: "fill" | "outline";
  /** The static color style to apply. Useful when the button appears over a color background. */
  staticColor?: "white" | "black";
  /**
   * Whether the button should be displayed with a quiet style.
   * @deprecated
   */
  isQuiet?: boolean;
}
