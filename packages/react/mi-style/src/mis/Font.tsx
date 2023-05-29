import { Theme } from "types";
import { createMi } from "../create-mi";
import { ColorProps, ColorStyle, FontProps, FontStyle, MarginProps, MarginStyle, PaddingProps, PaddingStyle, PositionProps, PositionStyle, SizeProps, SizeStyle } from "../mi-styles";

interface FontInterface extends PaddingProps, MarginProps, SizeProps, FontProps, ColorProps, PositionProps { }

const cssSet = (theme: Theme) => ({ ...(theme.set.Font && theme.set.Font) })

export const Font = createMi<FontInterface>({
  tagName: 'p',
  styles: [PaddingStyle, MarginStyle, SizeStyle, FontStyle, ColorStyle, PositionStyle],
  cssSet,
  className: 'Font',
  css: `
  padding: unset;
  margin: unset;
`
});