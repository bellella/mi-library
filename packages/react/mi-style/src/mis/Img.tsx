import { createMi } from "../create-mi";
import { BorderProps, BorderStyle, ColorProps, ColorStyle, MarginProps, MarginStyle, PaddingProps, PaddingStyle, PositionStyle, SizeProps, SizeStyle } from "../mi-styles";
import { MiStyle, Theme } from "../types";

interface ImgInterface extends PaddingProps, MarginProps, SizeProps, ColorProps, BorderProps {
  objectFit?: string;
  objectPosition?: string;
}

const cssSet = (theme: Theme) => ({ ...(theme.set.Img && theme.set.Img) })

export const ImgStyle: MiStyle = {
  apply: ({ objectFit, objectPosition }) => ({
    ...(objectFit && { objectFit }),
    ...(objectPosition && { objectPosition }),
  }),
  propsNames: ['objectFit', 'objectPosition']
}

export const Img = createMi<ImgInterface>({
  tagName: 'img',
  styles: [ImgStyle, ColorStyle, MarginStyle, PaddingStyle, SizeStyle, BorderStyle],
  css: {
    height: 'auto',
    width: '100%'
  },
  cssSet
});