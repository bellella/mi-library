import { Theme } from "types";

const defaultTheme: Theme = {
  unit: 4,
  media: {
    desktop: '@media (min-width: 1200px)',
    tablet: '@media (min-width: 750px) and (max-width: 1199px)',
    mobile: '@media (max-width: 749px)',
  },
  color: {},
  createSet: (theme: Theme) => ({
  }),
  set: {
  }
}

export default defaultTheme;