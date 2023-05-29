import { MiStyle } from "types";

export const TransformStyle: MiStyle = {
  apply: ({ transform }) => ({
    ...(transform && {
      transform
    })
  }),
  propsNames: ['transform']
}

export interface TransformProps {
  transform?: string;
}