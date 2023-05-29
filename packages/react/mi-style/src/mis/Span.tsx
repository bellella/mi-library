import { Theme } from "types";
import { createMi } from "../create-mi";
import { BorderProps, BorderStyle, ColorProps, ColorStyle, DisplayProps, TransformProps, DisplayStyle, FlexContentProps, FlexContentStyle, MarginProps, MarginStyle, PaddingProps, PaddingStyle, PositionProps, PositionStyle, SizeProps, SizeStyle, TransformStyle } from "../mi-styles";

export interface SpanInterface extends PaddingProps, MarginProps, SizeProps, PositionProps, ColorProps, BorderProps, DisplayProps { }

const cssSet = (theme: Theme) => ({ ...(theme.set.Span && theme.set.Span) })

export const Span = createMi<SpanInterface>({
  tagName: 'span',
  styles: [PaddingStyle, MarginStyle, SizeStyle,
    PositionStyle, ColorStyle, BorderStyle, DisplayStyle],
  cssSet,
});