import { BorderProps, BorderStyle, ColorProps, ColorStyle, MarginProps, MarginStyle, PaddingProps, PaddingStyle, Theme, createMi } from "@milibrary/mi-style";

export interface TextareaInterface extends ColorProps, PaddingProps, MarginProps, BorderProps { };

export const Textarea = createMi<TextareaInterface>({
  tagName: <textarea />,
  styles: [ColorStyle, PaddingStyle, MarginStyle, BorderStyle],
  cssSet: (theme: Theme) => ({ ...(theme.set.Textarea && theme.set.Textarea) }),
  css: {
    height: '100%',
    width: '100%',
    maxWidth: '1300px',
    margin: '0 auto',
  }
});