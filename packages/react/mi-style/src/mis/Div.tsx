import { Result, Theme } from "types";
import { createMi } from "../create-mi";
import { BorderProps, BorderStyle, ColorProps, ColorStyle, DisplayProps, TransformProps, DisplayStyle, FlexContentProps, FlexContentStyle, MarginProps, MarginStyle, PaddingProps, PaddingStyle, PositionProps, PositionStyle, SizeProps, SizeStyle, TransformStyle } from "../mi-styles";

export interface DivInterface extends PaddingProps, MarginProps, SizeProps, PositionProps, ColorProps, BorderProps, DisplayProps, FlexContentProps, TransformProps { }

const cssSet = (theme: Theme) => ({ ...(theme.set.Div && theme.set.Div) })

export const Div = createMi<DivInterface>({
  tagName: 'div',
  styles: [PaddingStyle, MarginStyle, SizeStyle,
    PositionStyle, ColorStyle, BorderStyle, DisplayStyle, FlexContentStyle, TransformStyle],
  cssSet,
});